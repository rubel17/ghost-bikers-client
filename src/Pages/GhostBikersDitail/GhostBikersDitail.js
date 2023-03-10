import React, { useContext } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import useTitle from '../../hooks/useTitle';

const GhostBikersDitail = () => {
    const {user} = useContext(AuthContext);
    
    useTitle('Ghost Bikers');
    const {title,price,rating, description, picture, _id} = useLoaderData();
    return (
        <div className='d-lg-flex'>
        <div className='w-50 m-md-5'>
            <img className='my-3' src={picture} style={{ width: '32rem', height:'500px' }} alt="" />
            <div className='w-50 ms-2 d-lg-flex justify-content-between'>
            <p>Price:{price}</p>
            <p>Ratings:{rating}</p>
            </div>
            <h3 className='fs-2 ms-2 fw-semibold'> <strong className='text-danger'>Title:-</strong>  {title}</h3>
            <h6 className='ms-2'> <strong className='text-info'>Description:-</strong> {description}</h6>
            <div className='ms-2 mb-5 border p-5 border-3 me-5 '>
                {
                    user?<h4 className='text-danger'>Click The Button</h4> : <h4 className='text-danger'>Please Login.</h4>
                }
                <Link to={`/AddServices/${_id}`}><button className='btn btn-success'>Add Service</button></Link>
            </div>

            </div>
            <div className='ms-2 mb-5 mx-auto d-flex align-items-center justify-content-start'>
                {/*new input= just responsive */}
               <div className='border m-5 p-5 border-3 mb-5'>
               {
                    user?<h4 className='text-danger'>Click The Button</h4> : <h4 className='text-danger'>Please Login.</h4>
                }
                <Link to={`/AddReview/${_id}`}><button className='btn btn-danger'>Add Reviews</button></Link>
               </div>
            </div>
       </div>
    );
};

export default GhostBikersDitail;