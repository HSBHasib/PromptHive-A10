"use client";

import React from "react";
import { Table, Chip } from "@heroui/react";

const PaymentsContent = ({ payments = [] }) => {
  return (
    <div className="w-full bg-[#f3e7e7] border border-[#867070]/30 rounded-2xl overflow-hidden shadow-sm">
      <div className="w-full overflow-x-auto">
        <Table aria-label="Payments Table" className="max-w-[1500px] w-full">
          <Table.Content>
            <Table.Header>
              <Table.Column className="bg-[#e6d8d8] text-[#867070] font-bold text-xs py-4 tracking-wider">CUSTOMER</Table.Column>
              <Table.Column className="bg-[#e6d8d8] text-[#867070] font-bold text-xs py-4 tracking-wider">EMAIL</Table.Column>
              <Table.Column className="bg-[#e6d8d8] text-[#867070] font-bold text-xs py-4 tracking-wider">PLAN</Table.Column>
              <Table.Column className="bg-[#e6d8d8] text-[#867070] font-bold text-xs py-4 tracking-wider">AMOUNT</Table.Column>
              <Table.Column className="bg-[#e6d8d8] text-[#867070] font-bold text-xs py-4 tracking-wider">DATE</Table.Column>
              <Table.Column className="bg-[#e6d8d8] text-[#867070] font-bold text-xs py-4 tracking-wider">TRANSACTION ID</Table.Column>
            </Table.Header>

            <Table.Body 
              items={payments} 
              emptyContent={
                <div className="py-10 text-center text-[#867070]">
                  <p className="font-bold">No payment records found</p>
                </div>
              }
            >
              {(item) => (
                <Table.Row key={item.transactionId}>
                  <Table.Cell className="text-sm font-bold text-[#403535]">{item.customerName}</Table.Cell>
                  <Table.Cell className="text-sm text-stone-600">{item.billingEmail}</Table.Cell>
                  <Table.Cell>
                    <Chip size="sm" variant="flat" className="capitalize">{item.plan}</Chip>
                  </Table.Cell>
                  <Table.Cell className="text-sm font-bold text-[#403535]">${item.amountCharged}</Table.Cell>
                  <Table.Cell className="text-sm text-stone-600">{item.paymentDate}</Table.Cell>
                  <Table.Cell className="text-xs font-mono text-stone-500">{item.transactionId}</Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table.Content>
        </Table>
      </div>
    </div>
  );
};

export default PaymentsContent;
