import { FaEnvelope, FaMapMarkedAlt, FaPhone } from "react-icons/fa";


const Contact = () => {
       return(
       
              <div className="flex flex-col items-center justify-center min-h-screen py-12"
              style={{backgroundImage:"url('https://images.pexels.com/photos/459335/pexels-photo-459335.jpeg')"}}>
                     
                     <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
                            <h1 className="text-4xl text-center font-bold mb-6">Contact Us</h1>
                            <p className="text-slate-600 text-center mb-4">We would love to hear from you! Please fill out the form or contact us directly</p>

                            <form className="space-y-4">
                                   <div>
                                   <label className="block text-sm font-medium text-gray-700">
                                          Name
                                   </label>
                                   <input type="text" required   placeholder="Enter your name" className=" block w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                  </div>

                                   <div>
                                   <label className="block text-sm font-medium text-gray-700">
                                          Email
                                   </label>
                                   <input type="email" required   placeholder="Enter your email" className=" block w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                  </div>

                                   <div>
                                   <label className="block text-sm font-medium text-gray-700">
                                          Message
                                   </label>
                                   <textarea rows="4" required   placeholder="Enter your email" className=" block w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                  </div>

                                  <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-red-500 transition duration-300">
                                     Send Message
                                  </button>
                            </form>

                            <div className="mt-8 text-center">
                                   <h2 className="text-lg font-semibold">Contact Information</h2>
                                   <div className="flex flex-col items-center space-y-2 mt-4 ">
                                          <div className="flex items-center">
                                                 <FaPhone className="text-blue-500 mr-2" />
                                                 <span className="text-gray-800">
                                                        +91 9960251469
                                                 </span>
                                          </div>

                                          <div className="flex items-center">
                                                 <FaEnvelope className="text-blue-500 mr-2" />
                                                 <span className="text-gray-800">
                                                        electornic@gmail.com
                                                 </span>
                                          </div>

                                            <div className="flex items-center">
                                                 <FaMapMarkedAlt className="text-blue-500 mr-2" />
                                                 <span className="text-gray-800">
                                                        123,Vedas Avenue,Nashik
                                                 </span>
                                          </div>


                                   </div>
                            </div>



                     </div>

              </div>



       )


}

export default Contact;
