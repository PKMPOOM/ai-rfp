"use client";

import {
  QueryClient,
  QueryClientProvider,
  isServer,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental";
import { message } from "antd";
import { MessageInstance } from "antd/es/message/interface";
import { createContext, useContext } from "react";

function makeQueryClient() {
  return new QueryClient();
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (isServer) {
    return makeQueryClient();
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

type messageContext = {
  messageAPI: MessageInstance;
};

export const MessageContext = createContext({} as messageContext);

export function Providers(props: { children: React.ReactNode }) {
  const [messageAPI, messaageContextHolder] = message.useMessage();

  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryStreamedHydration>
        <MessageContext.Provider value={{ messageAPI: messageAPI }}>
          {messaageContextHolder}
          {props.children}
        </MessageContext.Provider>
      </ReactQueryStreamedHydration>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export function useMessage() {
  return useContext(MessageContext);
}
