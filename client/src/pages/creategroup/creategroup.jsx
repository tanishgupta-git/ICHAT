import React,{useState} from 'react';
import './creategroup.css';

const CreateGroup = ({user}) => {
    const [name,Setname] = useState("");
    const [description,Setdescription] = useState("");
    const [image,Setimage] = useState("");
    const [error,Seterror] = useState('');
    const types = ['image/png','image/jpeg','image/jpg'];
    const handleSubmit = (e) => {
        e.preventDefault();
     
        if(!name && !image && !description) {
            Seterror('All Fileds Are Required')
            return;
        }
   
        if( name.length < 5){
           Seterror('Title Should Be Between 5 and 50 Characters');
           return;
         }
   
         if(description.length <= 20){
           Seterror('Description Should Be Greater Than 20 Characters');
           return;
         }
   
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description',description);
        formData.append('image', image);
   
        fetch('http://localhost:5000/chat/create-group',{
           method : 'POST',
           body : formData,
           headers : 
           {
               Authorization : 'Bearer ' + user.token         
             } 
        }).then( res => {
         return res.json()
        })
        .then( resData => {
            console.log(resData);
        })
        .catch( err => {
          console.log(err);
        })
       } 
   
    // function for handling the chnages in image
    const handleChange = (e) => {
        let selected = e.target.files[0];
        if(selected && types.includes(selected.type)){
             if((selected.size / 1000000) > 2) {
                Setimage(null);
                Seterror('Image file should be less than 2MB'); 
                return;  
            }
            Setimage(selected);
            Seterror('');
        }else{
            Setimage(null);
           Seterror('Please select an image of type png,jpeg,jpg'); 
        }
       }
    return (
        <div>
        <form onSubmit={handleSubmit}>
           { error && <span>{error}</span>}
            <input type='text' name='name' value={name} onChange={(e) => (Setname(e.target.value))} />
            <input type='text' name='description' value={description} onChange={(e) => (Setdescription(e.target.value))} />
            <input type='file' name='image' onChange={handleChange} />
            <input type='submit' value='Create Group'/>
        </form>
        </div>
    ) 
}

export default CreateGroup;