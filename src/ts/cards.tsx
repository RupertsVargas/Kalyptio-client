import React ,{ useState, Dispatch } from 'react';
import { urlGlobal } from './url';
import {FC} from "react";
import axios from 'axios';
import { DateRangePicker } from 'rsuite';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle, faUmbrella,faVideo ,faBuilding,faBuildingLock,faBars,faStairs, faStar} from '@fortawesome/free-solid-svg-icons'
import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Select from 'react-select'
import moment from 'moment';
// import Alert from 'react-bootstrap/Alert';
import {arrayAmenities} from "../ts/insert";
const arrayAmenities2 = [
    faVideo,
    faUmbrella,
    faBuilding,
    faStairs,
    faBuildingLock,
    faBars,
];

const Card : FC =  () => {
    const typeOptions  : any=  [
    {value:"public",label:"Public"},
    {value:"private",label:"Private"} 
    ];
    const priceOptions = [
        {value:"max",label:"Max total price for stay"},
        {value:"min",label:"Min total price for stay"} 
        // "Max total price for stay","Min total price for stay"
    ];
    // let anotherAmenities = arrayAmenities;
    var amenitiesOptions:any =  [];
    arrayAmenities.forEach(function(part, index) {
        amenitiesOptions[index] = {value:index,label:part}; 
    }); 

    amenitiesOptions = amenitiesOptions;

    const [data, setData] = React.useState<any>([]);
    const [change, setChange] = React.useState<any>({});
    const [price, setPrice] = React.useState<any>();
    const [dataParkingChoice, setDataParkingChoice] = React.useState<any>({});
    const [dateUniversal, setDate] = React.useState<any>();
    const [dateUniversal2, setDate2] = React.useState<any>();
    // const [alertitas,setAlertitas]  = React.useState<any>("");
        
    
    // let preHtml : any= (<div>HOLA</div>);
    
    const getDate_ = (str:any) => {
        if (str !== undefined) {
            var date = new Date(str),
                mnth = ("0" + (date.getMonth() + 1)).slice(-2),
                day = ("0" + date.getDate()).slice(-2);
            return [date.getFullYear(), mnth, day].join("-");
            } else {
            return "";
            }
        } 
    const [amenitiesPost, setAmenitiesPost] = React.useState<any>(null);
    const [pricePost, setPricePost] = React.useState<any>(null);
    const [typePost, setTypePost] = React.useState<any>(null);
    const changeOption_amenities = (e:any)=>{
        setAmenitiesPost(e);
        console.log(e);
    }
    const changeOption_price = (e:any)=>{
        setPricePost(e);
        console.log(e);
    }
    const changeOption_Type = (e:any)=>{
        setTypePost(e);
        // console.log(e);
    }
    const onChangeDateRangePicker2 = (e:any) => {      setDate2(e);  }

    const onChangeDateRangePicker = (e:any) => {        setDate(e);         }
    const onClick_ = async (e: any) => {
            let dateInit = (getDate_(dateUniversal[0]));
            let dateFinal = (getDate_(dateUniversal[1]));
            let id = e.id;
            let price = e.price;
        
            let test = await axios({
                method: 'get',
                url: urlGlobal+'getParkingsDate?id='+id+"&dateInit="+dateInit+"&dateEnd="+dateFinal+"&price="+price,
                headers: {
                    //         "Content-Type": "multipart/form-data",
                            "Content-Type": "application/json" 
                }
                // data: {id:id}
            })
                .then(function (response) {
                // console.log(response.data);
                console.log(response);
                let data_ = (response.data);
                let new_:any = {};
                // setAlertitas("");
                data_.forEach( (element:any) => {
                    let letter = element.id;    
                    let newArrayFile:any = [];
                    if (Array.isArray(element.files)) {
                        // es un array
                        (element.files).forEach( (element:any) => {
                            newArrayFile.push( getImage(element) );
                            });
                        // console.log("ARRAY")
                        } else if (typeof element.files === 'object') {
                        // console.log("OBEJT");
                        let fil = element.files;
                        element.files = [element.files];
                        // data_[data_].ful = [element.files];
                        newArrayFile.push( getImage(fil) );
                        // es un objeto regular que no es un array
                      } else {
                        // puede ser undefined, string, number o boolean.
                      }
                    new_[letter] = {id:element.id,files: newArrayFile ,index:0};
                });
                setChange(new_);
                // console.log(new_);
                setData(data_);
                return response; 
                // return response;
                // let data_ = (response.data);
                // data
                // setData(data_);
            
        });

            return  test;
    
    }

    function arrayBufferToBase64(buffer:any) {
        let binary = '';
        let bytes = new Uint8Array(buffer);
        let len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        // console.log("TERMINADO");
        return window.btoa(binary);
    }
    function getImage(json:any):any {
        console.log(json);
        // json = json.len
        // if(json.length){}
        let arrayBuffer = json.data.data ? json.data.data : json.data ;
        let type = json.mimetype;
        let aux = arrayBufferToBase64(arrayBuffer);
        return `data:${type};base64,${aux}`;
    }

    const clickSearchData =  async (params:any) => {
            console.log("JEJE");
            let post = 
            {type:typePost,
            price:pricePost,
            amenities:amenitiesPost
        };
        let request =  await axios({
            method: 'post',
            data: JSON.stringify(post),
            url: urlGlobal+'getParkings2',
            headers: {
        
                        "Content-Type": "application/json" 
            }
            // data: data_
        })
            .then(function (response) {

                // return response;
            console.log(response);
            let data_ = (response.data);
            let new_:any = {};
            // setAlertitas("");
            data_.forEach( (element:any) => {
                let letter = element.id;    
                let newArrayFile:any = [];
                if (Array.isArray(element.files)) {
                    // es un array
                    (element.files).forEach( (element:any) => {
                        newArrayFile.push( getImage(element) );
                        });
                    // console.log("ARRAY")
                    } else if (typeof element.files === 'object') {
                    // console.log("OBEJT");
                    let fil = element.files;
                    element.files = [element.files];
                    // data_[data_].ful = [element.files];
                    newArrayFile.push( getImage(fil) );
                    // es un objeto regular que no es un array
                  } else {
                    // puede ser undefined, string, number o boolean.
                  }
                new_[letter] = {id:element.id,files: newArrayFile ,index:0};
            });
            setChange(new_);
            // console.log(new_);
            setData(data_);
            return response;    
    });
    console.log(request);
    return request;

}
    

    React.useEffect(() => {
        // setAlertitas(
        // <Alert className='contentAlerts' key={"info"} variant={"info"}>L o a d i n g</Alert>);
        axios({
            method: 'get',
            url: urlGlobal+'getParkings',
            headers: {
        
                        "Content-Type": "application/json" 
            }
            // data: data_
        })
            .then(function (response) {
            console.log(response);
            let data_ = (response.data);
            let new_:any = {};
            // arrayBuffer
            // console.log("JEJE MY");
            // setAlertitas("");
            data_.forEach( (element:any,index:any) => {
                let letter = element.id;    
                let newArrayFile:any = [];
                
                    if (Array.isArray(element.files)) {
                        // es un array
                        (element.files).forEach( (element:any) => {
                            newArrayFile.push( getImage(element) );
                            });
                        // console.log("ARRAY")
                        } else if (typeof element.files === 'object') {
                        // console.log("OBEJT");
                        let fil = element.files;
                        element.files = [element.files];
                        // data_[data_].ful = [element.files];
                        newArrayFile.push( getImage(fil) );
                        // es un objeto regular que no es un array
                      } else {
                        // puede ser undefined, string, number o boolean.
                      }
                   
                
                new_[letter] = {id:element.id,files: newArrayFile ,index:0};
            });
            setChange(new_);
            console.log(new_);
            setData(data_);
        
    });
    }, []);

    const [show, setShow] = useState(false);
    // const [price, setPrice] = useState();
    
    const [change_, setChange_] = React.useState(false);
    const [count, setCount] = useState({});
    const handleClose = () => setShow(false);
    function handleInsertParking (row:any,data:any):any  {
        console.log("JEJE MY FRIEND");
        console.log(data);
        // e.id;
        // let price = e.price;
        let sendData:any = {id: data.id, price: data.price};
        let insertPark = onClick_(sendData);
        setShow(false) 
    };
    const handleShow = (row:any) : any =>{ 
        setDataParkingChoice(row);
        setShow(true)
    // console.log(onClick_)
    let is = isItAvailable(row);
    let rightArray = writePrice(is);
    setPrice([is,rightArray]);
        console.warn(price);
    console.log(row);
    
    };
    const HandleShow2 = (e:any,number:any) => {
    // function handleShow2 (e:any) {
        let element = change;
        let id = e;
        let result = element[id].index = number;
        setChange(element);
        setCount(element);
        setChange_(true);
        setDate2([]);
  
};



    const another__ = (req:any) =>{
    let price_:any = req.price;
    let init = req.dateInit+"T00:00:01";
    let end = req.dateEnd+"T00:00:01";
    

    let initMonth :any = moment(init,"YYYY-MM-DD").format("MM")+"";
    let enedMonth :any = moment(end,"YYYY-MM-DD").format("MM")+"";
    let initDay :any = moment(init,"YYYY-MM-DD").format("DD")+"";
    let endDay :any = moment(end,"YYYY-MM-DD").format("DD")+"";

    let rangeYearInit :any = moment(init,"YYYY-MM-01").format("YYYY")+"";
    let rangeYearEnd :any = moment(end,"YYYY-MM-01").format("YYYY")+"";
    let rangeYearTotal =  (parseInt(rangeYearEnd)-parseInt(rangeYearInit))+1; 

    let sameYearAndMonth = rangeYearEnd==rangeYearInit &&  initMonth == enedMonth ? true:false;
    let initMomentYear :any = moment(init,"YYYY-MM-01").format("YYYY")+"";
    
    let ArrayDataWithTotal:any = {};
    for (let index = 0; index < rangeYearTotal; index++) {
        let ArrayByDays:any = [];
        let sumTotal = 0.0;
    
    
        let year_ = parseInt(rangeYearInit)+index;
        ArrayDataWithTotal[year_] = {}; 
        // res.send(year_ + " ");
        let init_ = index ==0 ? init : `${year_}-01-01T00:00:00`;
        let rangeInit :any = moment(init_,"YYYY-MM-01").format("MM")+"";
        rangeInit = rangeInit-1
        let rangeEnd :any = moment(end,"YYYY-MM-01").format("MM")+"";
        let rangeTotal = (parseInt(rangeEnd)-parseInt(rangeInit))+1;
        let iInit=0;

        let initMes = rangeInit;
        let endMes = rangeEnd;
        if(rangeTotal<=0){
            iInit=parseInt(rangeInit);
            initMes = rangeInit;
            endMes = rangeEnd;
        }

        rangeTotal = 12;
        if(index!=0){
            initMes = 0;
            initMonth = initMes;
            rangeTotal = (parseInt(rangeEnd)-parseInt(rangeInit))+1;
            if(rangeTotal<0){
            }else{
                rangeTotal = rangeEnd;
            }

        }

            if(sameYearAndMonth===true){
                rangeTotal=initMes+1;
                // res.send("JEJE");
            }

        for (let i = initMes; i < (rangeTotal); i++) {
            let iPlus = (i+1)+"";
            let mesito =  iPlus.length == 1 ? "0"+(i+1): (i+1);
            if(iInit!=0){
                mesito = iInit;
            }
            // console.log(i);
            let arrayDays2 = Array.from(Array(moment(`${year_}-${mesito}`).daysInMonth()), (_, i_) => i_+1);
            let priceByDay_ = (parseInt(price_)/arrayDays2.length);
            let initDay_ =  parseInt(initDay);
            let endDay_ =  year_==rangeYearEnd && 
            enedMonth-1 == i
            ?  parseInt(endDay) :  arrayDays2[arrayDays2.length-1];

            let sumSubTotal = 0.0;
            let arrayDays = Array.from(Array(moment(`${year_}-${mesito}`).daysInMonth()), (_, i_) => 
            {   

                let value = 0;
                let json:any = {};
                let letter = i_ + 1;
                json["day"] = letter;
                json["price"] = false;
                
                if(i==initMonth-1){
                    if(((initDay_)-1) > i_){
                        json["price"] = false;
                        // sumSubTotal = sumSubTotal + priceByDay_;
                        // initDay_--;
                    }
                    else{
                        json["price"] = true;
                        // res.send("NET");
                        sumSubTotal = sumSubTotal + priceByDay_;
                        initDay_++;

                            if(initMonth==enedMonth && letter>endDay_-1
                                && sameYearAndMonth ===true){
                                    json["price"] = false;
                                    sumSubTotal = sumSubTotal - priceByDay_;                    }
                    }

                
                }
                if(i>(initMonth-1) 
                && i<rangeTotal
                && i!=rangeTotal-1
                ){                    // &&  letter < endDay_+1 ){
                    json["price"] = true;
                    sumSubTotal = sumSubTotal + priceByDay_;
                }
                
                if(i==(rangeTotal-1)
                    // &&  letter < endDay_+1 AUN NO SE 
                    &&  letter < endDay_+1
                    ){
                    json["price"] = true;
                    sumSubTotal = sumSubTotal + priceByDay_;
                    if(sameYearAndMonth===true){
                
                        sumSubTotal = sumSubTotal - priceByDay_;
                    }

                }


            
                return     json ; 
            }
            );
            // let whatPrice = 
            sumTotal = sumTotal+ Math.round(sumSubTotal);
            // sumTotal = sumTotal+ (sumSubTotal);
            let a = {
                days: arrayDays  , 
                // subTotal : Math.round(sumSubTotal),
                subTotal : Math.round(sumSubTotal),
                priceByDay: priceByDay_ } ;

            
                

                ArrayByDays.push(a);

        }

        // res.send({data:ArrayByDays,total:sumTotal});

        ArrayDataWithTotal[year_]={data:ArrayByDays,total:sumTotal};

    }
    return ArrayDataWithTotal;
    }
    // const 
    const writePrice = (data:any)=>{
                    // console.info(data);
                    const objetoAVerificar = data[1];
                    // Object.entries(objetoAVerificar).length === 0;
            if( Object.entries(objetoAVerificar).length === 0){
                let span = <span className="spanprice" style={{color:"#617da7",fontSize:"10px"}}>select a date to see availability</span>;
                // setPrice(span);
                return span;
            }
            let array = Object.values(data[1]);
            let sum = 0;
            array.forEach((element:any) => {
                sum = sum +element.total ;
                    });
            // console.log(data[0]);
            let span = <span className="spanprice" style={{color:"#617da7"}}><span className="signerPeque">$ </span>{sum}<span>Total</span></span>
            // setPrice(span);
            return span;

    }
    
    const isItAvailable = (row:any):any =>{
        let dateRange = row.dateRange;
        let dateUniversal_ = dateUniversal == undefined ? [undefined,undefined] : dateUniversal;
        // console.log(dateUniversal_);
            let dateInit = (getDate_(dateUniversal_[0]));
            let dateFinal = (getDate_(dateUniversal_[1]));
            let arrayPricePay:any = {};

        if(dateRange != "---"){
                
            let array_ = JSON.parse(dateRange);
            // console.log(array_);
            let stop = "1";
            let auxPost = {
                price: row.price,
                dateInit : dateInit+"T00:00:01",
                dateEnd : dateFinal+"T00:00:01",
            };
            arrayPricePay = (another__(auxPost));

            (array_).forEach( (element:any) => {
            
                let init2 =  element.init+"T00:00:00";
                let end2 = element.end+"T23:59:59";
            
                if( moment(dateInit).isBetween( moment(init2), moment(end2) ) ||
                    moment(dateFinal).isBetween( moment(init2), moment(end2) )
                ){
                    // console.log("NOPUEDESJE");
                    stop = "0.5";
                }
            });

            return [(stop),arrayPricePay];


        }
        
        if(dateRange == "---"){

            let auxPost = {
                price: row.price,
                dateInit : dateInit+"T00:00:01",
                dateEnd : dateFinal+"T00:00:01",
            };
            arrayPricePay = (another__(auxPost));
           
            return [1,arrayPricePay];
            
        }
        // else{
        
        // }


        return [1,arrayPricePay];
    }

    let anotherData = data.length === 0 ? "" : 
    data.map((row:any, index:any) => ( 
        <div className='contentCardsAll' key={index} style={{opacity: isItAvailable(row)[0]}}  >
            
        <div className="card cardCustome" 
        // style={ {width: "50%"}        } 
        >   
            <span className="contentAllImg">
            {row.files.map((rowChecks:any, index:any) => (
            <span key={"imgContent"+index} className="contentImg" 
            // onHide={(change[row.id]["index"] == index ? "":"none")}
            style={{
            //     // backgroundImage:`url(${getImage(row,index)})`,
            height: change[row.id]["index"] == index ? "": 0,
            width: change[row.id]["index"] == index ? "": 0,
            opacity: change[row.id]["index"] == index ? 1: 0,
            transition: "linear 0.2s "
            }} 
            >
                <img className='imgtrue' src={`${(change[row.id].files[index])}`} alt="Girl in a jacket" width="" 
                height={"100%"}></img>

            <div className="iconsCirclesContent">
            {
                        row.files.map((rowChecks_:any, index:any) => (
                            <span key={"spanIcon"+index} 
                            onClick= {                               
                                (e) => {HandleShow2(row.id,index)}
                            }
                            className="spanIconCircle"><FontAwesomeIcon 
                                icon={faCircle} /> </span>
                        ))
                    }
            
                </div>

            </span>
            ))}
            </span>
            <div className="card-body cardBodyCustome"  onClick = {
                
                (e)=> {handleShow(row)}
                // VOLVER AQUI
            // onClick_
            // (e)=> Example(row)
            // async (e) => { let test = await onClick_(row) ;
            //     console.log(test);    
            // }
            
        } >
                <h5 className="card-title cardTitleCustome"> <span>{row.street}, <span>#{row.number}</span>, CA </span> 
                <span> <FontAwesomeIcon icon={faStar} style={{color:"#214984",opacity: ( (row.score/5)!=0 ? (row.score/5) : 0.1)}} /> {row.score}</span>
                    </h5>
                <div className="card-icons">
                        
                        {
                        JSON.parse(row.checks).map((rowChecks:any, index:any) => (
                            <div className="divIconContent" key={"checks"+index}>
                            
                                <span className='iconContent'><FontAwesomeIcon icon={arrayAmenities2[rowChecks.id]} /></span>
                                <span className='textContentIcon'>{rowChecks.value}</span>
                            </div>
                
                        ))
                        }
                            
                </div>
                        
                <div className="priceClass">
                    <span className="spanprice"><span className="signerPeque">$</span> {row.price+" "}MXN/Mes <span></span>➔</span>
                    <span id="idConvertion">
                    {writePrice(isItAvailable(row))          }

                        </span>
                </div>
              
            </div>
            </div>
            

    
        
                        
    </div>
            
            ));

    return (<div  >

        
        <div className="classBeforeDatePicker">
        
        <br></br>
        <>
        
        <Modal show={show} onHide={handleClose}>
            

            <Modal.Header closeButton>
            <Modal.Title>Parking choice - #{dataParkingChoice.street}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="contentBodyModal">

            <div>
            {
                    dataParkingChoice.checks ?
                    <span className='estrellitacontent'><FontAwesomeIcon icon={faStar} style={{color:"#214984",opacity: ( (dataParkingChoice.score/5)!=0 ? (dataParkingChoice.score/5) : 0.1)}} /> 
                    {dataParkingChoice.score}
                    </span>
                    :
                    ""
                }
            
                    

                </div>
                <div className='contentAvailable'>
                    {(price ?  
                ( ( Object.entries(price[0][1]).length !== 0) ? (price[0][0] == "0.5" ? 
                <div style={{color :"red"}} >Not Available</div> : <div style={{color:"green"}}>Available</div>  ) : 
                <div style={{color :"red"}} >Not Available</div> ) : <div style={{color:"red"}}>Not Available</div> )}
                </div>
                <div>Type: <span className="quiteFontWeight">{dataParkingChoice.type}</span></div>
                <div>Amenities 
                {   
                        dataParkingChoice.checks ? JSON.parse(dataParkingChoice.checks).map((rowChecks:any, index:any) => (
                            <div className="divIconContent" key={"checks"+index} style={{width:"100%"}}>
                                {/* {console.log(rowChecks)} */}
                                <span className='iconContent'><FontAwesomeIcon icon={arrayAmenities2[rowChecks.id]} /></span>
                                <span className='textContentIcon Zoom_'>{rowChecks.value}</span>
                            </div>
                            // console.log()
                        )) : ""
                        }

                </div>
                

            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            
                
            <Button  variant="primary" onClick={ (e:any) : any=> {handleInsertParking(price,dataParkingChoice)}}
            style={{display:
                (price ?  
                ( ( Object.entries(price[0][1]).length !== 0) ? (price[0][0] == "0.5" ? "none" : "") : "none") : "none" )
            }}
            >
            Get parking
            </Button>

            </Modal.Footer>
        </Modal>
        </>
        <div className="contentFiltersmiddle">
                <div className="col-md-6"> 
                <Select
                className="basic-single"
                classNamePrefix="select"
                // defaultValue={colourOptions[0]}
                // isDisabled={isDisabled}
                // isLoading={isLoading}
                isClearable={true}
                // isRtl={isRtl}
                // isSearchable={isSearchable}
                onChange={changeOption_Type}
                name="type_"
                options={typeOptions}
                />
                </div>
                <div className="col-md-6">
                <Select
                className="basic-single"
                classNamePrefix="select"
                onChange={changeOption_price}
                isClearable={true}
                name="price_"
                options={priceOptions}
                />
                </div>
        </div>
        <br></br>
        <Select
            defaultValue={[]}
            isMulti
            name="amenities_"
            onChange={changeOption_amenities}
            options={amenitiesOptions}
            className="basic-multi-select customeONESELECT"
            classNamePrefix="select"
        />
        <br></br>
        <br></br>
        {/* <br></br> */}
        

                <div 
                className="col-12 classBtnCustome">
                    <button onClick={async (e)=>  {return await clickSearchData(e) }} style={{width:"25%"}} type="button" className="btn btn-primary">Search Parkings</button>
                </div>
        

        </div>
        
        <div style={{display:"none"}} className="classBeforeDatePicker"><DateRangePicker format="yyyy-MM-dd" onChange={onChangeDateRangePicker2}
        
        />

        

        </div>
        <br></br>
        <div className='classRangeCustome02'><DateRangePicker className="customeInnerDate" format="yyyy-MM-dd" onChange={onChangeDateRangePicker}             /></div>
        <br></br>
        <br></br>
        <div className='classContentFormSelect'>{anotherData}</div>
        <div className='contentAbsoulte'>
        {/* <div className='contentAbsoulte'><Alert className='contentAlerts' key={"info"} variant={"info"}>L o a d i n g</Alert></div> */}
            {/* {alertitas} */}
            
        </div>
        </div>)
  
    
    
        
}

export{Card};