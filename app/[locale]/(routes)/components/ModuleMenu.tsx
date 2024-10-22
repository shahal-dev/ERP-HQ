'use client';

import type { FC } from 'react';
import React, { useEffect, useState } from 'react';

import ProjectModuleMenu from './menu-items/Projects';
import SecondBrainModuleMenu from './menu-items/SecondBrain';
import InvoicesModuleMenu from './menu-items/Invoices';
import ReportsModuleMenu from './menu-items/Reports';
import DocumentsModuleMenu from './menu-items/Documents';
import ChatGPTModuleMenu from './menu-items/ChatGPT';
import EmployeesModuleMenu from './menu-items/Employees';
import WorkflowsModuleMenu from './menu-items/Workflows';
import DataboxModuleMenu from './menu-items/Databoxes';
import CrmModuleMenu from './menu-items/Crm';

import AdministrationMenu from './menu-items/Administration';
import DashboardMenu from './menu-items/Dashboard';
import EmailsModuleMenu from './menu-items/Emails';
import { cn } from '@/lib/utils';
import type { system_Modules_Enabled } from '@prisma/client';
import type { getDictionary } from '@/dictionaries';

type Props = {
  modules: system_Modules_Enabled[];
  dict: Awaited<ReturnType<typeof getDictionary>>;
  build: number;
};

const ModuleMenu: FC<Props> = ({ modules, dict, build }) => {
  const [open, setOpen] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="flex flex-col">
      <div
        className={`${open ? 'w-72' : 'w-25'} relative h-screen p-5 pt-8 duration-300`}
      >
        <div className="flex items-center gap-x-4">
          {/* Toggle Button */}
          <div
            className={`cursor-pointer rounded-full border px-4 py-2 duration-500 ${open && 'rotate-[360deg]'}`}
            onClick={() => setOpen(!open)}
          >
            {/* Logo always visible */}
            <img
              src="icccad.png" // Update the path to your logo image
              alt="ICCCAD Logo"
              className={`${open ? 'h-8' : ' h-5'} transition-all duration-300`} // Adjust size based on the open state
            />
          </div>

          {/* App Name visible only when menu is open */}
          {/* <h1
            className={`origin-left text-xl font-medium duration-200 ${!open && 'scale-0'}`}
          >
            {process.env.NEXT_PUBLIC_APP_NAME}
          </h1> */}
        </div>

        <div className="pt-6">
          <DashboardMenu open={open} title={dict.ModuleMenu.dashboard} />
          {modules.find(
            (menuItem) => menuItem.name === 'crm' && menuItem.enabled
          ) ? (
            <CrmModuleMenu open={open} localizations={dict.ModuleMenu.crm} />
          ) : null}
          {modules.find(
            (menuItem) => menuItem.name === 'projects' && menuItem.enabled
          ) ? (
            <ProjectModuleMenu open={open} title={dict.ModuleMenu.projects} />
          ) : null}
          {modules.find(
            (menuItem) => menuItem.name === 'emails' && menuItem.enabled
          ) ? (
            <EmailsModuleMenu open={open} title={dict.ModuleMenu.emails} />
          ) : null}
          {modules.find(
            (menuItem) => menuItem.name === 'secondBrain' && menuItem.enabled
          ) ? (
            <SecondBrainModuleMenu open={open} />
          ) : null}
          {modules.find(
            (menuItem) => menuItem.name === 'employee' && menuItem.enabled
          ) ? (
            <EmployeesModuleMenu open={open} />
          ) : null}
          {modules.find(
            (menuItem) => menuItem.name === 'invoice' && menuItem.enabled
          ) ? (
            <InvoicesModuleMenu open={open} title={dict.ModuleMenu.invoices} />
          ) : null}
          {modules.find(
            (menuItem) => menuItem.name === 'workflows' && menuItem.enabled
          ) ? (
            <WorkflowsModuleMenu
              open={open}
              //@ts-ignore-next-line
              title={dict.ModuleMenu?.workflows}
            />
          ) : null}
          {modules.find(
            (menuItem) => menuItem.name === 'reports' && menuItem.enabled
          ) ? (
            <ReportsModuleMenu open={open} title={dict.ModuleMenu.reports} />
          ) : null}
          {modules.find(
            (menuItem) => menuItem.name === 'documents' && menuItem.enabled
          ) ? (
            <DocumentsModuleMenu open={open} title={dict.ModuleMenu.documents} />
          ) : null}
          {modules.find(
            (menuItem) => menuItem.name === 'databox' && menuItem.enabled
          ) ? (
            <DataboxModuleMenu open={open} />
          ) : null}
          {modules.find(
            (menuItem) => menuItem.name === 'openai' && menuItem.enabled
          ) ? (
            <ChatGPTModuleMenu open={open} />
          ) : null}
          <AdministrationMenu open={open} title={dict.ModuleMenu.settings} />
        </div>
      </div>
      <div
        className={cn('flex w-full items-center justify-center', {
          hidden: !open,
        })}
      >
        <span className="pb-2 text-xs text-gray-500">
          build: {process.env.NEXT_PUBLIC_APP_V}
        </span>
      </div>
    </div>
  );
};

export default ModuleMenu;
