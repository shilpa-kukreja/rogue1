
import React from 'react'

import loginimg from '../assets/login.jpg'

import { assets } from '../assets/assets'



const FotgotPassword = () => {




    return (
        <div className=' flex w-[100vw] h-[100vh] '>

            <div className='w-[30%]'>
                <img src={loginimg} className="h-full w-[100%] " alt="" />
            </div>

            <div className='w-[70%] m-auto  flex  justify-center'>
                <div className='w-[400px]'>
                    <div>
                        <img src={assets.s4} alt="Logo" className="w-30 mix-blend-multiply opacity-40" />
                    </div>
                    <div>
                        <p className='text-[#A9ABAE] text-sm'>Forgot Your Password?</p>
                        <p className='text-[#A9ABAE] text-sm'>
                            Let’s get you back on track to a fashion world!
                        </p>



                    </div>



                    <form action="" id='frmLogin'>
                        <div>
                            <input type="email" className='border w-full py-1 mt-6 mb-3 px-2 text-[#A9ABAE] placeholder-[#A9ABAE] text-sm outline-0' name='txtemail' id='txtemail' placeholder='Email' />
                        </div>







                        

                        <div>
                            <button type='submit' className='w-full border  bg-[#605B55] hover:bg-[#534f49]   py-1 px-2 mt-3 text-[#D2D3D5] text-sm outline-0 cursor-pointer'> Forgot </button>
                        </div>


                    </form>




                </div>


            </div>
        </div>
    )
}

export default FotgotPassword;
