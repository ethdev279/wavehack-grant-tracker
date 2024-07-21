"use client";
import { useState, useEffect } from "react";
import { Layout } from "antd";
import "antd/dist/reset.css";

const { Header, Footer, Content } = Layout;

export default function SiteLayout({ children }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 99,
          width: "100%",
          // display: "flex",
          alignItems: "center"
        }}
      >
        <p
          style={{
            textAlign: "center",
            color: "white",
            fontWeight: "bold",
            fontSize: "15px"
          }}
        >
          Wavehack Grant Tracker
          <small style={{ fontSize: "10px" }}>Mainnet</small>
        </p>
      </Header>
      <Content
        style={{
          margin: "12px 8px",
          padding: 8,
          minHeight: "100%",
          color: "black",
          maxHeight: "100%"
        }}
      >
        {mounted && children}
      </Content>
      <Footer style={{ textAlign: "center" }}>
        <a
          href="https://github.com/ethdev279/wavehack-grant-tracker"
          target="_blank"
          rel="noopener noreferrer"
        >
          ©{new Date().getFullYear()} Wavehack Grant Tracker. Powered by
          TheGraph & Next.js
        </a>
        <p style={{ fontSize: "12px" }}>v0.0.1</p>
      </Footer>
    </Layout>
  );
}
