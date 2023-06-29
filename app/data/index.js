//
export const categories = [
    { id: 1, categoryName: "Daily" },
    { id: 2, categoryName: "Weekly" },
    { id: 3, categoryName: "Monthly" },
    { id: 4, categoryName: "Yearly" },
]
//
export const vitalSignsData = [
    {
        id: 1, vitalSignName: "Blood Pressure",
        category: "Weekly", measure: "141/90", status: "high",
        imageUrl: require("../../assets/images/VitalSigns/blood.png")
    },
    {
        id: 2, vitalSignName: "Temperature",
        category: "Weekly", measure: "37c", status: "medium",
        imageUrl: require("../../assets/images/VitalSigns/temperature.png")
    },
    {
        id: 3, vitalSignName: "Heart Beat",
        category: "Weekly", measure: "40b", status: "good",
        imageUrl: require("../../assets/images/VitalSigns/heart.png")
    },
    {
        id: 4, vitalSignName: "Seizure",
        category: "Weekly", measure: "Not Happen", status: "good",
        imageUrl: require("../../assets/images/VitalSigns/fall.png")
    },
];
export const responsibles = [
    { id: 1, name: "Abdinasir Mohamud Hassan", responsibleType: "Friend", imageUri: "https://1fid.com/wp-content/uploads/2022/07/aesthetic-profile-picture-2-1024x1024.jpg" },
    { id: 2, name: "Abdirahman Abdirashid Ahmed", responsibleType: "Friend", imageUri: "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?cs=srgb&dl=pexels-mohamed-abdelghaffar-771742.jpg&fm=jpg" },
    { id: 3, name: "Mohamed Amin Ali", responsibleType: "Father", imageUri: "https://e0.pxfuel.com/wallpapers/492/141/desktop-wallpaper-bumbalugard-on-shadow-best-profile-profile-instagram-devil-boy.jpg" },
    { id: 4, name: "Hani Mohamed Ali", responsibleType: "Sister", imageUri: "https://www.wallpaperg.com/screenshot/shot7/1384528981-screenshot-www.wallpaperg.com.jpg" },
    { id: 5, name: "Nasro Abdi Ahmed", responsibleType: "Mother", imageUri: "https://play-lh.googleusercontent.com/BMryS7Cn454jIAVrchF9as-7WOG07H97Lugr62ISdJSo7wj1cC-0MTUm3SqSZffc7IQ" },
]