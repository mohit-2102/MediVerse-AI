'use client'

import { useState } from 'react'
import Sidebar from '@/components/dashboard/Sidebar'
import DashboardHeader from '@/components/dashboard/DashboardHeader'
import MobileFooterMenu from '@/components/dashboard/MobileFooterMenu'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ClipboardCheck, FileText, Calendar, FlaskConical, Heart, Pill, ChevronRight, Router } from 'lucide-react'

export default function DashboardPage() {
    const [expanded, setExpanded] = useState(false)
    const router = useRouter()

    const isDesktop = typeof window !== "undefined" && window.innerWidth >= 768

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-[#EFF6FF] via-[#F5F3FF] to-[#DBEAFE]">

            {/* === Desktop Sidebar === */}
            <div className="hidden md:block">
                <Sidebar onWidthChange={setExpanded} />
            </div>

            {/* === Main Content === */}
            <motion.div
                layout
                animate={{
                    marginLeft: isDesktop ? (expanded ? 200 : 64) : 0,  // FIXED
                }}
                transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                className="flex-1 pb-20 md:pb-0"  // spacing for mobile footer
            >
                <DashboardHeader />

                {/* ======= Rest of dashboard sections remain unchanged ======= */}
                <section className="px-6 mt-8 max-w-5xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-900 text-center mb-2">
                        How can MediVerse AI help you today?
                    </h2>
                    <p className="text-gray-500 text-center mb-8">
                        Your intelligent healthcare companion is ready to assist
                    </p>

                    {/* Top Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="bg-white rounded-2xl p-6 shadow-2xl cursor-pointer"
                        >
                            <div className="bg-gradient-to-br from-[#3B82F6] to-[#9333EA] rounded-xl p-8 flex items-center justify-center mb-4">
                                <svg width="60" height="53" viewBox="0 0 60 53" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0 3.75C0 1.67578 1.67578 0 3.75 0H56.25C58.3242 0 60 1.67578 60 3.75C60 5.82422 58.3242 7.5 56.25 7.5V45C58.3242 45 60 46.6758 60 48.75C60 50.8242 58.3242 52.5 56.25 52.5H3.75C1.67578 52.5 0 50.8242 0 48.75C0 46.6758 1.67578 45 3.75 45V7.5C1.67578 7.5 0 5.82422 0 3.75ZM30 7.5C28.9688 7.5 28.125 8.34375 28.125 9.375V13.125H18.75C17.7188 13.125 16.875 13.9688 16.875 15C16.875 16.0312 17.7188 16.875 18.75 16.875H28.125V22.5H15C13.9688 22.5 13.125 23.3438 13.125 24.375C13.125 25.4062 13.9688 26.25 15 26.25H28.125V34.5234L22.1602 32.2266C21.5508 31.9922 20.918 31.875 20.2617 31.875H20.0156C17.25 31.875 15 34.125 15 36.8906C15 38.0156 15.375 39.1055 16.0664 39.9844L18.1992 42.7031C19.3359 44.1562 21.082 45 22.9219 45H37.0781C38.918 45 40.6641 44.1562 41.8008 42.7031L43.9336 39.9844C44.625 39.1055 45 38.0156 45 36.8906C45 34.125 42.75 31.875 39.9844 31.875H39.7266C39.082 31.875 38.4375 31.9922 37.8281 32.2266L31.875 34.5234V26.25H45C46.0312 26.25 46.875 25.4062 46.875 24.375C46.875 23.3438 46.0312 22.5 45 22.5H31.875V16.875H41.25C42.2812 16.875 43.125 16.0312 43.125 15C43.125 13.9688 42.2812 13.125 41.25 13.125H31.875V9.375C31.875 8.34375 31.0312 7.5 30 7.5ZM24.375 37.5C24.8723 37.5 25.3492 37.6975 25.7008 38.0492C26.0525 38.4008 26.25 38.8777 26.25 39.375C26.25 39.8723 26.0525 40.3492 25.7008 40.7008C25.3492 41.0525 24.8723 41.25 24.375 41.25C23.8777 41.25 23.4008 41.0525 23.0492 40.7008C22.6975 40.3492 22.5 39.8723 22.5 39.375C22.5 38.8777 22.6975 38.4008 23.0492 38.0492C23.4008 37.6975 23.8777 37.5 24.375 37.5ZM33.75 39.375C33.75 38.8777 33.9475 38.4008 34.2992 38.0492C34.6508 37.6975 35.1277 37.5 35.625 37.5C36.1223 37.5 36.5992 37.6975 36.9508 38.0492C37.3025 38.4008 37.5 38.8777 37.5 39.375C37.5 39.8723 37.3025 40.3492 36.9508 40.7008C36.5992 41.0525 36.1223 41.25 35.625 41.25C35.1277 41.25 34.6508 41.0525 34.2992 40.7008C33.9475 40.3492 33.75 39.8723 33.75 39.375Z" fill="white" />
                                </svg>

                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Instant Diagnosis</h3>
                            <p className="text-sm text-gray-600 mb-4">
                                Upload scans to detect conditions instantly using our advanced AI technology
                            </p>
                            <button onClick={()=> router.push("/analysis")} className="text-sm font-medium text-blue-600">Get started →</button>
                        </motion.div>

                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="bg-white rounded-2xl p-6 shadow-2xl cursor-pointer"
                            onClick={() => alert('Navigate to /reports')}
                        >
                            <div className="bg-gradient-to-br from-[#10B981] to-[#0D9488] rounded-xl p-8 flex items-center justify-center mb-4">
                                <svg width="45" height="60" viewBox="0 0 45 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M22.5 0C17.6016 0 13.4297 3.12891 11.8945 7.5H7.5C3.36328 7.5 0 10.8633 0 15V52.5C0 56.6367 3.36328 60 7.5 60H37.5C41.6367 60 45 56.6367 45 52.5V15C45 10.8633 41.6367 7.5 37.5 7.5H33.1055C31.5703 3.12891 27.3984 0 22.5 0ZM22.5 7.5C23.4946 7.5 24.4484 7.89509 25.1516 8.59835C25.8549 9.30161 26.25 10.2554 26.25 11.25C26.25 12.2446 25.8549 13.1984 25.1516 13.9017C24.4484 14.6049 23.4946 15 22.5 15C21.5054 15 20.5516 14.6049 19.8484 13.9017C19.1451 13.1984 18.75 12.2446 18.75 11.25C18.75 10.2554 19.1451 9.30161 19.8484 8.59835C20.5516 7.89509 21.5054 7.5 22.5 7.5ZM8.4375 31.875C8.4375 31.1291 8.73382 30.4137 9.26126 29.8863C9.78871 29.3588 10.5041 29.0625 11.25 29.0625C11.9959 29.0625 12.7113 29.3588 13.2387 29.8863C13.7662 30.4137 14.0625 31.1291 14.0625 31.875C14.0625 32.6209 13.7662 33.3363 13.2387 33.8637C12.7113 34.3912 11.9959 34.6875 11.25 34.6875C10.5041 34.6875 9.78871 34.3912 9.26126 33.8637C8.73382 33.3363 8.4375 32.6209 8.4375 31.875ZM20.625 30H35.625C36.6562 30 37.5 30.8438 37.5 31.875C37.5 32.9062 36.6562 33.75 35.625 33.75H20.625C19.5938 33.75 18.75 32.9062 18.75 31.875C18.75 30.8438 19.5938 30 20.625 30ZM8.4375 43.125C8.4375 42.3791 8.73382 41.6637 9.26126 41.1363C9.78871 40.6088 10.5041 40.3125 11.25 40.3125C11.9959 40.3125 12.7113 40.6088 13.2387 41.1363C13.7662 41.6637 14.0625 42.3791 14.0625 43.125C14.0625 43.8709 13.7662 44.5863 13.2387 45.1137C12.7113 45.6412 11.9959 45.9375 11.25 45.9375C10.5041 45.9375 9.78871 45.6412 9.26126 45.1137C8.73382 44.5863 8.4375 43.8709 8.4375 43.125ZM18.75 43.125C18.75 42.0938 19.5938 41.25 20.625 41.25H35.625C36.6562 41.25 37.5 42.0938 37.5 43.125C37.5 44.1562 36.6562 45 35.625 45H20.625C19.5938 45 18.75 44.1562 18.75 43.125Z" fill="white" />
                                </svg>

                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Medical Health Report</h3>
                            <p className="text-sm text-gray-600 mb-4">
                                View or generate your comprehensive medical history summary and reports
                            </p>
                            <span className="text-sm font-medium text-green-600">View reports →</span>
                        </motion.div>
                    </div>
                </section>

                {/* Quick Actions */}
                <section className="mt-12 px-6 max-w-5xl mx-auto">
                    <h3 className="text-xl font-bold text-gray-900 text-center mb-6">Quick Actions</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="bg-white rounded-2xl p-6 shadow-2xl cursor-pointer hover:shadow-lg flex flex-col items-center"
                        >
                            <div className="bg-gradient-to-br from-[#EC4899] to-[#F43F5E] rounded-xl p-4 mb-3">
                                <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3.75 1.25V2.5H1.875C0.839844 2.5 0 3.33984 0 4.375V6.25H17.5V4.375C17.5 3.33984 16.6602 2.5 15.625 2.5H13.75V1.25C13.75 0.558594 13.1914 0 12.5 0C11.8086 0 11.25 0.558594 11.25 1.25V2.5H6.25V1.25C6.25 0.558594 5.69141 0 5 0C4.30859 0 3.75 0.558594 3.75 1.25ZM17.5 7.5H0V18.125C0 19.1602 0.839844 20 1.875 20H15.625C16.6602 20 17.5 19.1602 17.5 18.125V7.5ZM8.75 9.6875C9.26953 9.6875 9.6875 10.1055 9.6875 10.625V12.8125H11.875C12.3945 12.8125 12.8125 13.2305 12.8125 13.75C12.8125 14.2695 12.3945 14.6875 11.875 14.6875H9.6875V16.875C9.6875 17.3945 9.26953 17.8125 8.75 17.8125C8.23047 17.8125 7.8125 17.3945 7.8125 16.875V14.6875H5.625C5.10547 14.6875 4.6875 14.2695 4.6875 13.75C4.6875 13.2305 5.10547 12.8125 5.625 12.8125H7.8125V10.625C7.8125 10.1055 8.23047 9.6875 8.75 9.6875Z" fill="white" />
                                </svg>

                            </div>
                            <h4 className="text-sm font-bold text-gray-900 mb-1">Schedule</h4>
                            <p className="text-xs text-gray-500">Book appointment</p>
                        </motion.div>

                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="bg-white rounded-2xl p-6 shadow-2xl cursor-pointer hover:shadow-lg flex flex-col items-center"
                        >
                            <div className="bg-gradient-to-br from-[#F97316] to-[#F59E0B] rounded-xl p-4 mb-3">
                                <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3.75 1.25V2.5H1.875C0.839844 2.5 0 3.33984 0 4.375V6.25H17.5V4.375C17.5 3.33984 16.6602 2.5 15.625 2.5H13.75V1.25C13.75 0.558594 13.1914 0 12.5 0C11.8086 0 11.25 0.558594 11.25 1.25V2.5H6.25V1.25C6.25 0.558594 5.69141 0 5 0C4.30859 0 3.75 0.558594 3.75 1.25ZM17.5 7.5H0V18.125C0 19.1602 0.839844 20 1.875 20H15.625C16.6602 20 17.5 19.1602 17.5 18.125V7.5ZM8.75 9.6875C9.26953 9.6875 9.6875 10.1055 9.6875 10.625V12.8125H11.875C12.3945 12.8125 12.8125 13.2305 12.8125 13.75C12.8125 14.2695 12.3945 14.6875 11.875 14.6875H9.6875V16.875C9.6875 17.3945 9.26953 17.8125 8.75 17.8125C8.23047 17.8125 7.8125 17.3945 7.8125 16.875V14.6875H5.625C5.10547 14.6875 4.6875 14.2695 4.6875 13.75C4.6875 13.2305 5.10547 12.8125 5.625 12.8125H7.8125V10.625C7.8125 10.1055 8.23047 9.6875 8.75 9.6875Z" fill="white" />
                                </svg>

                            </div>
                            <h4 className="text-sm font-bold text-gray-900 mb-1">Prescriptions</h4>
                            <p className="text-xs text-gray-500">Manage medications</p>
                        </motion.div>

                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="bg-white rounded-2xl p-6 shadow-2xl cursor-pointer hover:shadow-lg flex flex-col items-center"
                        >
                            <div className="bg-gradient-to-br from-[#6366F1] to-[#A855F7] rounded-xl p-4 mb-3">
                                <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3.75 1.25V2.5H1.875C0.839844 2.5 0 3.33984 0 4.375V6.25H17.5V4.375C17.5 3.33984 16.6602 2.5 15.625 2.5H13.75V1.25C13.75 0.558594 13.1914 0 12.5 0C11.8086 0 11.25 0.558594 11.25 1.25V2.5H6.25V1.25C6.25 0.558594 5.69141 0 5 0C4.30859 0 3.75 0.558594 3.75 1.25ZM17.5 7.5H0V18.125C0 19.1602 0.839844 20 1.875 20H15.625C16.6602 20 17.5 19.1602 17.5 18.125V7.5ZM8.75 9.6875C9.26953 9.6875 9.6875 10.1055 9.6875 10.625V12.8125H11.875C12.3945 12.8125 12.8125 13.2305 12.8125 13.75C12.8125 14.2695 12.3945 14.6875 11.875 14.6875H9.6875V16.875C9.6875 17.3945 9.26953 17.8125 8.75 17.8125C8.23047 17.8125 7.8125 17.3945 7.8125 16.875V14.6875H5.625C5.10547 14.6875 4.6875 14.2695 4.6875 13.75C4.6875 13.2305 5.10547 12.8125 5.625 12.8125H7.8125V10.625C7.8125 10.1055 8.23047 9.6875 8.75 9.6875Z" fill="white" />
                                </svg>

                            </div>
                            <h4 className="text-sm font-bold text-gray-900 mb-1">Lab Results</h4>
                            <p className="text-xs text-gray-500">View test results</p>
                        </motion.div>

                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="bg-white rounded-2xl p-6 shadow-2xl cursor-pointer hover:shadow-lg flex flex-col items-center"
                        >
                            <div className="bg-gradient-to-br from-[#22C55E] to-[#10B981] rounded-xl p-4 mb-3">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    
                                    <path d="M1.85938 11.7343L8.91797 18.3242C9.21094 18.5976 9.59766 18.75 10 18.75C10.4023 18.75 10.7891 18.5976 11.082 18.3242L18.1406 11.7343C19.3281 10.6289 20 9.07809 20 7.457V7.23043C20 4.49997 18.0273 2.17184 15.3359 1.72262C13.5547 1.42575 11.7422 2.00778 10.4688 3.28122L10 3.74997L9.53125 3.28122C8.25781 2.00778 6.44531 1.42575 4.66406 1.72262C1.97266 2.17184 0 4.49997 0 7.23043V7.457C0 9.07809 0.671875 10.6289 1.85938 11.7343Z" fill="white" />
                                </svg>


                            </div>
                            <h4 className="text-sm font-bold text-gray-900 mb-1">Health Tips</h4>
                            <p className="text-xs text-gray-500">Daily wellness</p>
                        </motion.div>
                    </div>
                </section>

                {/* Recent Activity */}
                <section className="mt-12 px-6 max-w-5xl mx-auto pb-12">
                    <div className="bg-white rounded-2xl p-6 shadow-md space-y-4">
                    <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h3>
                        <div className="flex items-center justify-between hover:bg-gray-50 p-3 rounded-lg cursor-pointer transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="bg-blue-500 rounded-full p-2 flex items-center justify-center">
                                    <FlaskConical className="w-4 h-4 text-white" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-gray-900">Blood test results uploaded</p>
                                    <p className="text-xs text-gray-500">2 hours ago</p>
                                </div>
                            </div>
                            <ChevronRight className="w-5 h-5 text-gray-400" />
                        </div>

                        <div className="flex items-center justify-between hover:bg-gray-50 p-3 rounded-lg cursor-pointer transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="bg-green-500 rounded-full p-2 flex items-center justify-center">
                                    <Calendar className="w-4 h-4 text-white" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-gray-900">
                                        Appointment confirmed with Dr. Smith
                                    </p>
                                    <p className="text-xs text-gray-500">Yesterday</p>
                                </div>
                            </div>
                            <ChevronRight className="w-5 h-5 text-gray-400" />
                        </div>
                    </div>
                </section>
            </motion.div>

            {/* === FIXED Mobile Footer Menu === */}
            <div className="md:hidden fixed bottom-0 left-0 w-full z-50">
                <MobileFooterMenu />
            </div>
        </div>
    )
}

// 'use client'

// import Sidebar from '@/components/dashboard/Sidebar'
// import DashboardHeader from '@/components/dashboard/DashboardHeader'
// import { motion } from 'framer-motion'
// import { ClipboardCheck, FileText, Calendar, FlaskConical, Heart, Pill } from 'lucide-react'

// export default function DashboardPage() {
//   return (
//     <main className="flex bg-gradient-to-br from-[#EFF6FF] via-[#F5F3FF] to-[#DBEAFE] min-h-screen">
//       {/* Sidebar */}
//       <Sidebar />

//       {/* Main Content */}
//       <div className="flex-1 ml-16 md:ml-48 transition-all duration-300">
//         <DashboardHeader />

//         {/* Welcome Section */}
//         <section className="px-8 mt-4">
//           <h2 className="text-2xl font-semibold text-gray-900 text-center">
//             How can MediVerse AI help you today?
//           </h2>
//           <p className="text-gray-500 text-center mb-10">
//             Your intelligent healthcare companion is ready to assist
//           </p>

//           {/* Top Cards */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
//             <motion.div
//               whileHover={{ scale: 1.02 }}
//               className="bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6] text-white rounded-2xl p-6 shadow-lg cursor-pointer"
//               onClick={() => alert('Navigate to /diagnosis')}
//             >
//               <ClipboardCheck className="w-8 h-8 mb-2" />
//               <h3 className="text-lg font-semibold">Instant Diagnosis</h3>
//               <p className="text-sm opacity-90 mb-2">
//                 Upload scans to detect conditions instantly using our AI technology
//               </p>
//               <span className="text-sm font-medium underline">Get started →</span>
//             </motion.div>

//             <motion.div
//               whileHover={{ scale: 1.02 }}
//               className="bg-gradient-to-r from-[#10B981] to-[#059669] text-white rounded-2xl p-6 shadow-lg cursor-pointer"
//               onClick={() => alert('Navigate to /reports')}
//             >
//               <FileText className="w-8 h-8 mb-2" />
//               <h3 className="text-lg font-semibold">Medical Health Report</h3>
//               <p className="text-sm opacity-90 mb-2">
//                 View or generate your comprehensive medical reports
//               </p>
//               <span className="text-sm font-medium underline">View reports →</span>
//             </motion.div>
//           </div>
//         </section>

//         {/* Quick Actions */}
//         <section className="mt-12 px-8 text-center">
//           <h3 className="text-lg font-semibold mb-6">Quick Actions</h3>
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
//             {[
//               { icon: Calendar, label: 'Schedule', desc: 'Book appointment', path: '/schedule' },
//               { icon: Pill, label: 'Prescriptions', desc: 'Manage medications', path: '/prescriptions' },
//               { icon: FlaskConical, label: 'Lab Results', desc: 'View test results', path: '/lab-results' },
//               { icon: Heart, label: 'Health Tips', desc: 'Daily wellness', path: '/health-tips' },
//             ].map(({ icon: Icon, label, desc }) => (
//               <motion.div
//                 key={label}
//                 whileHover={{ scale: 1.05 }}
//                 className="bg-white rounded-xl p-5 shadow-md cursor-pointer hover:shadow-lg"
//               >
//                 <Icon className="w-7 h-7 mx-auto mb-3 text-[#6E5BFF]" />
//                 <h4 className="text-base font-semibold">{label}</h4>
//                 <p className="text-xs text-gray-500">{desc}</p>
//               </motion.div>
//             ))}
//           </div>
//         </section>

//         {/* Recent Activity */}
//         <section className="mt-12 px-8 max-w-4xl mx-auto">
//           <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
//           <div className="bg-white rounded-2xl p-5 shadow-md space-y-4">
//             <div className="flex items-center gap-3 border-b border-gray-100 pb-3">
//               <FlaskConical className="text-blue-500" />
//               <div>
//                 <p className="text-sm font-medium text-gray-800">Blood test results uploaded</p>
//                 <p className="text-xs text-gray-400">2 hours ago</p>
//               </div>
//             </div>
//             <div className="flex items-center gap-3">
//               <Calendar className="text-green-500" />
//               <div>
//                 <p className="text-sm font-medium text-gray-800">
//                   Appointment confirmed with Dr. Smith
//                 </p>
//                 <p className="text-xs text-gray-400">Yesterday</p>
//               </div>
//             </div>
//           </div>
//         </section>
//       </div>
//     </main>
//   )
// }
