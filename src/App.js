import logo from './logo.svg';
import './App.css';
import {useState} from 'react';

function Header(props) {
  return <header>
    <h1><a href="/" onClick={(e) => {
      e.preventDefault();
      props.onChangeMode();
    }}>{props.title}</a></h1>
  </header>
}

function Nav(props) {
  const lis = [];

  for (let i=0; i<props.topics.length; i++) {
    let t = props.topics[i];
    lis.push(<li key={t.id}>
      <a id={t.id} href={'/read/'+t.id} onClick={(e) => {
        e.preventDefault();
        props.onChangeMode(Number(e.target.id));
      }}>{t.title}</a>
    </li>)
  }
  return <nav>
    <ol>
      {lis}
    </ol>
  </nav>
}

function Article(props) {
  return <article>
    <h2>{props.title}</h2>
    {props.body}
  </article>
}

function App() {
  const [mode, setMode] = useState("WELCOME");
  const [id, setId] = useState(null);
  const topics = [
    {id:0, title: "html", body: "html is ..."},
    {id:1, title: "css", body: "css is ..."},
    {id:2, title: "js", body: "js is ..."}
  ];

  let content = null;
  if (mode === "WELCOME") {
    content = <Article title="Welcome" body="Hello, WEB!"></Article>
  } else if (mode === "READ") {
    content = <Article title={topics[id].title} body={topics[id].body}></Article>
  }

  return (
    <div className="App">
      <Header title="WEB" onChangeMode={() => {
        setMode("WELCOME");
      }}></Header>
      <Nav topics={topics} onChangeMode={(id) => {
        setMode("READ");
        setId(id)
      }}></Nav>
      {content}
    </div>
  );
}

export default App;
