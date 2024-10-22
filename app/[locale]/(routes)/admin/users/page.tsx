import { getUsers } from '@/actions/get-users';
import React from 'react';
import Container from '../../components/ui/Container';
import { InviteForm } from './components/InviteForm';
import { Separator } from '@/components/ui/separator';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { AdminUserDataTable } from './table-components/data-table';
import { columns } from './table-components/columns';
import type { Users } from '@prisma/client';
import SendMailToAll from './components/send-mail-to-all';

const AdminUsersPage = async () => {
  const users: Users[] = await getUsers();

  const session = await getServerSession(authOptions);

  if (!session?.user?.isAdmin) {
    return (
      <Container
        title="Administration"
        description="You are not admin, access not allowed"
      >
        <div className="flex h-full w-full items-center justify-center">
          Access not allowed
        </div>
      </Container>
    );
  }

  return (
    <Container
      title="Users administration"
      description={'Here you can manage your ICCCAD users'}
    >
      <div className="flex-col1">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          Invite new user to ICCCAD
        </h4>
        <InviteForm />
      </div>
      <Separator />
      <div>
        <SendMailToAll />
      </div>
      <Separator />

      <AdminUserDataTable columns={columns} data={users} />
    </Container>
  );
};

export default AdminUsersPage;
