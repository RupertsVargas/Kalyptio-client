import React ,{ useState, Dispatch } from 'react';
import logo from './logo.svg';
import './App.css';
import {Card} from './ts/cards';
import {InsertParkForm} from './ts/insert';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';


const RadioBtn = () => {
  /**
   * Determina si el checkbox debería estar checkeado basado en
   * el contenido del localStorage
   */
  const [checked, setChecked] = useState(
    localStorage.getItem("theme") === "dark" ? true : false
  );

  /**
   * Cada vez que el estado checked cambie, actualiza la propiedad
   * data-theme en el HTML para que use el tema que estamos almacenando
   * en el localStorage
   */
  React.useEffect(() => {
    let lll : any =  localStorage.getItem("theme") ;
    document
      .getElementsByTagName("HTML")[0]
      .setAttribute("data-theme",lll);
  }, [checked]);

  /**
   * Actualiza el estado checked y el contenido de nuestro objeto
   * theme en el localStorage basados en el checkbox
   */
  const toggleThemeChange = () => {
      console.log(checked)
      console.log(localStorage);
    if (checked === false) {
      localStorage.setItem("theme", "dark");
      setChecked(true);
    } else {
      localStorage.setItem("theme", "light");
      setChecked(false);
    }
  };

  return (
    
          <Form>
            <Form.Check 
              type="switch"
              id="custom-switch"
              className="customCheckLabel"
              label="Nocturno"
              defaultChecked={checked}
              onChange={() => toggleThemeChange()}
            />
          
          </Form>
        );

};

function App() {
  const [clickShow, setClickShow] = useState<any>(0);
  const ClickShow = (e:any) : any=>{
    let p = clickShow == 0 ? 1 : 0;
    // if(0)
    console.log(p);
    setClickShow(p);
  }

  return (
    <div>
      <Navbar 
      // style={{backgroundColor:"blue"}}
      >
        <Container>
            <Navbar.Brand href="./">
              <div className='ppicture'></div>
            </Navbar.Brand>
            <Navbar.Text>
                <a >Roberto Vargas</a>
              </Navbar.Text>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
            <RadioBtn></RadioBtn>
              <div onClick={ClickShow} className='InsertClassesHe' >
                Insert
              </div>
              {/* <Navbar.Text>
                Signed in as: <a href="#login">Mark Otto</a>
              </Navbar.Text> */}
            </Navbar.Collapse>
          </Container>
    </Navbar>
    <div className="App">
    
    {/* <div > */}
    {clickShow ==1 ?
    <InsertParkForm></InsertParkForm> : ""
    // </div>
    }
    <br></br>
    <Card></Card>
    <br></br>
    <br></br>
    <br></br>
    </div>
    </div>
  );
}

export default App;
