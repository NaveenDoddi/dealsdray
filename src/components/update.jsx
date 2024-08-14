import React, { useState, useEffect, useRef } from 'react';

function Edit() {
    const [employee, setEmployee] = useState({});
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [designation, setDesignation] = useState('HR');
    const [gender, setGender] = useState('Male');
    const [course, setCourse] = useState([]);
    const [image, setImage] = useState('');
    const [password, setPassword] = useState('');


    useEffect( ()=>{
        var user = window.location.href.split('?')[1]
        const fetchEmployee = async () => {
            try {
                await fetch('http://localhost:3001/api/employee/'+user)
                .then(response => response.json())
                .then((data)=>{
                  setName(data.name)
                  setEmail(data.email)
                  setMobile(data.mobile)
                  setDesignation(data.designation)
                  setGender(data.gender)
                  setCourse(data.course)
                  setImage(data.image)

                })
            
            } catch (err) {
                console.error(err);
            }
          };
        fetchEmployee();
    },[])


    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            name: name,
            email: email,
            mobile: mobile,
            designation: designation,
            gender: gender,
            course: course,
            image: image,
            password: btoa(password),
        }

        try {
            var user = window.location.href.split('?')[1]
            await fetch('http://localhost:3001/api/updateItem/'+user, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            })
            .then(response => {
                if (response.ok){
                    window.alert("successfully updated employee")
                    window.location.href = '/employee-list'
                }else
                    console.log("failed")
            })

            
        } catch (err) {
            console.error(err);
        }
    };
    function uploadImageF(e){
        var image = e.target.parentNode.childNodes[0];
        var file = e.target.files[0];
        
        if (file) {
          image.src = URL.createObjectURL(file);
          
          const reader = new FileReader();

          reader.onload = function(e) {
              const imageDataUri = e.target.result;
              image.src = imageDataUri
              setImage(imageDataUri)
          };

          reader.readAsDataURL(file);
          
        }
    }

    return (
        <div className="create-employee-container">
            <div className="create-employee-box">
                <h2>Edit Employee</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Mobile"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        required
                    />
                    <select
                        value={designation}
                        onChange={(e) => setDesignation(e.target.value)}
                        required
                    >
                        <option value="" disabled>Select Designation</option>
                        <option value="HR">HR</option>
                        <option value="Manager">Manager</option>
                        <option value="Sales">Sales</option>
                    </select>
                    <div className="gender-select">
                        <label>
                            Gender :
                            <input
                                type="radio"
                                value="Male"
                                checked={gender === 'Male'}
                                onChange={(e) => setGender(e.target.value)}
                            />
                            Male
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="Female"
                                checked={gender === 'Female'}
                                onChange={(e) => setGender(e.target.value)}
                            />
                            Female
                        </label>
                    </div>
                    <div className="course-select">
                        <label>
                            Course : 
                            <input
                                type="checkbox"
                                value="MCA"
                                checked={course.includes('MCA')}
                                onChange={(e) => setCourse(e.target.checked ? 'MCA' : '')}
                            />
                            MCA
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                value="BCA"
                                checked={course.includes('BCA')}
                                onChange={(e) => setCourse(e.target.checked ? 'BCA' : '')}
                            />
                            BCA
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                value="BSC"
                                checked={course.includes('BSC')}
                                onChange={(e) => setCourse(e.target.checked ? 'BSC' : '')}
                            />
                            BSC
                        </label>
                    </div>
                    <div> 
                        <div>
                            <img style={{height: '100px', width: '115px', borderRadius:'50%'}} src={image} alt="profile.png"/>
                            <input onChange={uploadImageF} type="file" accept="image/*" required/>
                        </div>
                    </div>

                    <input
                        type="password"
                        placeholder="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />                 
                    
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default Edit
