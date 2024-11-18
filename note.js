async function submit(){  
    if (document.getElementById("fname").value && document.getElementById("lname").value && document.getElementById("si").value &&
        document.getElementById("dob").value && document.getElementById("major").value && document.getElementById("uni").value){
            await new Promise(resolve=>{
                const xhr = new XMLHttpRequest()
                xhr.open("PUT" , `http://localhost:1111/students/${document.getElementById('si').value}`)
                xhr.setRequestHeader("Content-Type" , "application/json")
                xhr.send(JSON.stringify({                       
                Name : document.getElementById("fname").value,
                Family : document.getElementById("lname").value,
                Id : document.getElementById("si").value,
                Date_of_birth : document.getElementById("dob").value,
                Major : document.getElementById("major").value,
                University : document.getElementById("uni").value
                }))
                resolve()
                }).then(()=>{
                    refresh_data()
                    const btn = document.getElementById("submit")
                    btn.style.display = "none"
                    const add = document.getElementById("add")
                    add.style.display = ''
                    document.getElementById("fname").value = ''
                    document.getElementById("lname").value = ''
                    document.getElementById("si").value = ''
                    document.getElementById("dob").value = ''
                    document.getElementById("major").value = ''
                    document.getElementById("uni").value = ''
                    
                })
               
            }
        else{
            alert("Please Enter Whole Data's ...")
        }

}