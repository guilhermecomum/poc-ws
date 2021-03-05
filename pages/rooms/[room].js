import WebSocket from "isomorphic-ws";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";

export default function Room(props) {
  const [inRoom, setInRoom] = useState(false);
  const ws = useRef(null);
  const router = useRouter();
  const { room } = router.query;

  useEffect(() => {
    ws.current = new WebSocket("ws://localhost:8080");
    ws.current.onopen = () => {
      console.log("ws opened");
      ws.current.send({ room: "oi", text: "entrei" });
    };
    ws.current.onclose = () => console.log("ws closed");

    return () => {
      ws.current.close();
    };
  }, []);

  const Header = ({ name }) => {
    return <h1>Room: {name}</h1>;
  };

  return (
    <div>
      <main>{room && <Header name={room} />}</main>
      <aside>
        <h2>Clientes</h2>
      </aside>
    </div>
  );
}
