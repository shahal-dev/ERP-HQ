import { authOptions } from '@/lib/auth';
import { s3Client } from '@/lib/digital-ocean-s3';
import { prismadb } from '@/lib/prisma';
import { fillXmlTemplate } from '@/lib/xml-generator';
import { PutObjectAclCommand } from '@aws-sdk/client-s3';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: { invoiceId: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ status: 401, body: { error: 'Unauthorized' } });
  }

  const { invoiceId } = params;

  if (!invoiceId) {
    return NextResponse.json({
      status: 400,
      body: { error: 'There is no invoice ID; invoice ID is mandatory' },
    });
  }

  // Get data for invoice headers
  const myCompany = await prismadb.myAccount.findFirst({});

  // Get data for invoice body
  const invoiceData = await prismadb.invoices.findFirst({
    where: {
      id: invoiceId,
    },
  });

  // This function will generate XML file from template and data
  const xmlString = fillXmlTemplate(invoiceData, myCompany);

  // Store raw XML string in buffer
  const buffer = Buffer.from(xmlString);

  // Upload XML to S3 bucket and return URL
  const bucketParamsJSON = {
    Bucket: process.env.DO_BUCKET,
    Key: `xml/invoice-${invoiceId}.xml`,
    Body: buffer,
    ContentType: 'application/xml', // Change to 'application/xml' for XML files
    ContentDisposition: 'inline',
    // ACL: "public-read",
  };

  await s3Client.send(new PutObjectAclCommand(bucketParamsJSON));

  // S3 bucket URL for the invoice
  const urlMoneyS3 = `https://${process.env.DO_BUCKET}.${process.env.DO_REGION}.digitaloceanspaces.com/xml/invoice-${invoiceId}.xml`;

  // Write URL to database assigned to invoice
  await prismadb.invoices.update({
    where: {
      id: invoiceId,
    },
    data: {
      money_s3_url: urlMoneyS3,
    },
  });

  return NextResponse.json({ xmlString, invoiceData }, { status: 200 });
}
