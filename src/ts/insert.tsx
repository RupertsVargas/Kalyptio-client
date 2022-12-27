import React ,{ useState, Dispatch } from 'react';
import {FC} from "react";
import { Rating } from 'react-simple-star-rating';
import axios from 'axios';

const arrayPrice:{[key:string]:number} = {A:100,B:175,C:200,"":0};
// const arrayAmenities:{[key:number]:string} = ["Cámaras de vigilancia","Cajón techado","Departamento","Planta baja","Estacionamiento cerrado","Lugar en batería"];
export const arrayAmenities = ["Cámaras de vigilancia","Cajón techado","Departamento","Planta baja","Estacionamiento cerrado","Lugar en batería"];

type User = {
    data: [];
    // age: number;
  }
  type GetUsersResponse = {
    data: User[];
  };

  

function request<TResponse>(
    url: string,
    // method:"GET",
    // body: object,
    // `RequestInit` is a type for configuring 
    // a `fetch` request. By default, an empty object.
    config: RequestInit = {}
     
  // This function is async, it will return a Promise:
  ): Promise<TResponse> {
      
    // Inside, we call the `fetch` function with 
    // a URL and config given:
    return fetch(url, config)
      // When got a response call a `json` method on it
        .then((response) => response.json())
        // and return the result data.
        .then((data) => data as TResponse);
        
      // We also can use some post-response
      // data-transformations in the last `then` clause.
  }

const arrayId = ["street",
"price",
"score",
"type",
"description",
"image"];

async function setUsers(data_:any) {
    try {

// withCredentials: false,
// headers: {
    // "Content-Type": "multipart/form-data",
    // "Access-Control-Allow-Origin": "*",
        return await axios({
            method: 'post',
            url: 'http://localhost:7000/insertParkings',
            data: data_,
            withCredentials: false,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "multipart/form-data"
              }
       })
            .then(function (response) {
            //   response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'))
            console.log(response);
    
        return response;
            });

    } catch (error) {
        if (axios.isAxiosError(error)) {
        console.log('error message: ', error.message);
        return error.message;
        } else {
        console.log('unexpected error: ', error);
        return 'An unexpected error occurred';
        }
        }
    }

const InsertParkForm : FC = () => {
    let universalImg : any = [];
    const [reset,setReset] = useState(false);
    const [streetSelect, setStreetSelect] = useState('');
    const [form_data_Another, set_form_data_Another] = useState<any>();
    let letterStreet = streetSelect === "" || streetSelect === undefined ? "" : streetSelect;
    let valuePrice = arrayPrice[letterStreet];
    const [rating, setRating] = useState(0)
    const handleSubmit :any = async (e: any) => {
    e.preventDefault();
    let data2 = new FormData();
    console.log(form_data_Another[0]);
    // console.log(form_data_Another[1]);
    for(let i =0; i < form_data_Another.length; i++) {
    
            data2.append("files", form_data_Another[i] as File);
    
        
}
    
    let array :{[key:string]:any} =  {};
    arrayId.forEach(element => {
        const input = document.getElementById(element) as HTMLInputElement | null;
        // console.log(input);

        const value = input?.value ? input?.value : "" ;
        array[element] = value;
        if(element!="image"){
            data2.append(element,value);
        }
        // else
        // data2.append(element,value);
    });

    console.log(data2.get('files'));
    array["checks"] = {};
    
    let arrayCheck :any= [];
    for(let i = 0; i< 5; i++){
        let id_ = "amenities"+ i;
        const checkbox = document.getElementById(id_) as HTMLInputElement | null;
        const input = document.getElementById(id_) as HTMLInputElement | null;
        const value = input?.value ? input?.value : "" ;
        if (checkbox?.checked) {
            arrayCheck.push({id:i,value:value});
           
        } else {
            // console.log('Checkbox is NOT checked');
        }
   
    }
    data2.append("checks",JSON.stringify(arrayCheck));
    
    let auxFormDataImg = [];
    array["checks"] = arrayCheck;
    console.warn(data2);
    console.warn(array);
    let data = (array);
    console.log(data2);

    
    let req : any=  await setUsers(data2);
    const s2 = document.getElementById('score') as HTMLInputElement | null;
    const s3 = document.getElementById('description') as HTMLInputElement | null;

    for (let i = 0; i < 6; i++) {
        let checkboxSS:any = document.getElementById("amenities"+i+"") as HTMLInputElement | null;
        // checkboxSS?.checked=false
        if (checkboxSS?.checked != undefined) {
            checkboxSS.checked = false;
        }
        
    }

    s2!.value = "";
    s3!.value = "";

    setStreetSelect("");
    setRating(0);
    setFiles("");
    console.log("A LOOK GOOD");
    console.warn((req));
    return req;

}
  // Catch Rating value
    const handleRating = (rate: number) => {
        setRating(rate)

        // other logic
    }
    // Optinal callback functions
    const onPointerEnter = () => console.log('Enter')
    const onPointerLeave = () => console.log('Leave')
    const onPointerMove = (value: number, index: number) => console.log(value, index)
    const handleReset = () => { setRating(0)   }
    console.log(rating);

    const [files, setFiles] = useState("");
    const onChangeFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
        let size_ = (e.target.files)?.length ? (e.target.files)?.length : 0 ;
        const file_ : ArrayLike<File> =  e.target.files! ;
        console.log(e.target.files);
    
        if(size_>5){
            setFiles("");
            return false;
        }
        universalImg = [];
        let array_ = [];
        setFiles(e.target.value);
        set_form_data_Another(file_);
        
    }
    

    let html = (
        <div>
            <form id="idForm" className="row g-3" 
                onSubmit={handleSubmit }
                encType="multipart/form-data"
            >
                <div className="col-md-6">
                    <label htmlFor="street" className="form-label">Street</label>
                    <select required value={letterStreet } onChange={(e) => setStreetSelect(e.target.value)}    
                    id="street" className="form-select">
                    <option selected value={""}>Choose...</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    </select>
                </div>
                <div className="col-md-6">
                    <label htmlFor="price" className="form-label">Price</label>
                    <input required value={valuePrice} disabled type="number" min="1" step="any" className="form-control" id="price"/>
                </div>

                <div className="col-12">
                {arrayAmenities.map((row, index) => (
                    <div key={"arrayAmenities"+index} className="form-check">
                    
                    <input    value={row} className="form-check-input" type="checkbox" id={"amenities"+index}/>
                    <label className="form-check-label" htmlFor={"amenities"+index}>
                        {row}
                    </label>
                    </div>
                        
                        ))}

                </div>


                <div className="col-12">
                    <label htmlFor="score" className="form-label">Score</label>
                    <br></br>
                    <Rating
                    // id="score"
                    initialValue={rating}
                            onClick={handleRating}
                            onPointerEnter={onPointerEnter}
                            onPointerLeave={onPointerLeave}
                            onPointerMove={onPointerMove}
        /* Available Props */
                    />
                    <input id="score" type="hidden" value={rating}></input>
                    <input id="" type="button" onClick={handleReset} value="Reset"/>
                </div>
                <div className="col-12">
                    <label htmlFor="type" className="form-label">Type</label>
                    <select required 
                    // value={ letterStreet } onChange={(e) => setStreetSelect(e.target.value)}    
                    id="type" 
                    className="form-select"
                    >
                    <option selected value={""}>Choose...</option>
                    <option value="private">private</option>
                    <option value="public">public</option>
                    
                    </select>
                </div>
                <div className="col-12">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea id="description" required className="form-control"  rows={3}></textarea>
                    
                </div>
                
                <div className="col-12">
                    <label htmlFor="inputZip" className="form-label">Images {" (only 5)"}</label>
                    <input 
                    onChange={onChangeFiles} 
                    value={files}  
                    required 
                    
                    // name="image" 
                    name="files[]" 
                    id="image" type="file" 
                    // {...register("files") }
                    multiple={true}
                    accept="image/jpg, image/jpeg, image/png" 
                    />

                </div>
                
                <div className="col-12">
                    <button type="submit" className="btn btn-primary">Create New Car Parking</button>
                </div>
</form>
        </div>
    )

    console.log(reset);
    return reset == true ? <div onLoad={(e:any)=> setReset(false)}></div> : html;
}

export {InsertParkForm}