import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import Table from 'react-bootstrap/Table';
import SingleReview from '../SingleReview/SingleReview';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const MyReview = () => {
    const {user} =useContext(AuthContext)
    const{email} = user;
    const [reviews, setReviews]= useState([])

    const handleDeleteReview = id =>{
        const proceed = window.confirm('Are You Sure, You want to Delete this Review');
        if(proceed){
            fetch(`http://localhost:4000/reviewData/${id}`,{
                method:'DELETE',
            })
            .then(res=>res.json())
            .then(data=>{
             console.log(data)
                if(data.deletedCount > 0){
                    toast.success("Delete Successfully");
                  const remaining = reviews.filter(review =>review._id !== id);
                  setReviews(remaining);

                }
            })
        }
        // console.log('delete',id)
    }

    const handleUpdateReview = id =>{
        fetch(`http://localhost:4000/reviewData/${id}`,{
                method:'PATCH',
                headers:{
                    'content-type':'application/json'
                },
                body: JSON.stringify({status: 'Approved'})
            })
            .then(res=>res.json())
            .then(data=>{
                console.log(data)
                if(data.modifiedCount > 0){
                    toast.success("Update Successfully");
                    const remaining = reviews.filter(review => review._id !== id);
                    const approve = reviews.find(review=>review._id === id);
                    approve.status = "Approved"

                    const newReview = [approve, ...remaining];
                    setReviews(newReview);
                }
            })
    }


    useEffect(()=>{
        fetch(`http://localhost:4000/reviewData?email=${user.email}`)
        .then(res =>res.json())
        .then(data =>setReviews(data))
    },[user?.email]);
    // console.log(reviews)

    return (
        <div>
            <h3>{user?.email? email :'My'} - Review : {reviews.length}</h3>
            <Table>
                <thead>
                    <tr>
                    <th>Cancel</th>
                    <th>Service</th>
                    <th>Review</th>
                    <th>Price</th>
                    <th>Message</th>
                    </tr>
                </thead>

      <tbody>
      {
            reviews.map(review =><SingleReview
            key={review._id}
            review={review}
            handleDeleteReview={handleDeleteReview}
            handleUpdateReview={handleUpdateReview}
            ToastContainer = {ToastContainer}
            ></SingleReview>)
       }
      </tbody>
    </Table>
        </div>
    );
};

export default MyReview;