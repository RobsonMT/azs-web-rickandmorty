import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ApolloProvider } from "@apollo/client";
import { client } from "./services/apollo";
import { BrowserRouter } from "react-router-dom";
import { EpisodesProvider } from "./context/EpisodesContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <EpisodesProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </EpisodesProvider>
    </ApolloProvider>
  </React.StrictMode>
);
