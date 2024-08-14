import React, { useState } from 'react';

function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [designation, setDesignation] = useState('');
    const [gender, setGender] = useState('');
    const [course, setCourse] = useState('');
    const [image, setImage] = useState('');
    const [password, setPassword] = useState('')
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            name: name,
            email: email,
            mobile: mobile,
            password: btoa(password),
            designation: designation,
            gender: gender,
            course: course,
            image: image.name,
            
        }


        try {
            const res = await fetch('http://localhost:3001/api/postEmployee', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData),
            });

            if (!res.ok) {
                throw new Error('Failed to create employee');
            }else{
                
                window.alert("created succussfully")
                window.location.href = "/dashboard"
                sessionStorage.setItem("user",JSON.stringify(formData))

                
            }
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
                <div className="logo">
                    <img src=".\logo.png" alt="Company Logo" />
                </div>
                <h2>Create Employee</h2>
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
                        <img style={{height: '100px', width: '115px', borderRadius:'50%'}} src={image} alt="profile.png"/>
                        <input onChange={uploadImageF} type="file" accept="image/*"/>
                    </div>   

                    <input
                        type="password"
                        placeholder="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    
                    <button type="submit" >Submit</button>
                </form>
            </div>
        </div>
    );
}

export default Signup
