import { Component } from "react";

export default function Header(props) {
    console.log(props.name)
  return (
    
    <p>Bonjour {props.name}</p>
  );
}
