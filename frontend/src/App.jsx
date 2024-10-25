// App.js
import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { motion } from "framer-motion";
import BikeSalesDashboard from "./components/BikesSalesDashboard";
import { ArrowUpRight } from "lucide-react";

// Sample data for the chart
const sampleData = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 300 },
  { name: "Mar", value: 600 },
  { name: "Apr", value: 800 },
];

const App = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedParam, setSelectedParam] = useState("option1");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1500);
  }, []);

  // Loading animation
  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-r from-blue-900 to-purple-900">
        <motion.div
          className="text-4xl text-white font-bold"
          initial={{ scale: 0 }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          Loading Dashboard...
        </motion.div>
      </div>
    );
  }

  const Navigation = () => (
    <motion.nav
      className="bg-gradient-to-r from-blue-900 to-purple-900 p-6 shadow-xl"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-center space-x-6">
        {["Overview", "Model Info", "Dashboard"].map((text, index) => (
          <motion.button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-6 py-3 rounded-lg text-white font-semibold transform transition-all
              ${
                currentPage === index + 1
                  ? "bg-blue-500 shadow-lg"
                  : "bg-transparent hover:bg-blue-800"
              }
            `}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {text}
          </motion.button>
        ))}
      </div>
    </motion.nav>
  );

  const Page1 = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="m-6 bg-gradient-to-br from-white to-blue-50 shadow-xl">
        <CardHeader className="space-y-4">
          <motion.div
            initial={{ x: -20 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <CardTitle className="text-3xl text-blue-900">
              Project Overview
            </CardTitle>
            <CardDescription className="text-lg">
              Understanding the Dataset and Objectives
            </CardDescription>
          </motion.div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <motion.div
              className="bg-white p-6 rounded-lg shadow-md"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <h3 className="text-xl font-semibold text-blue-800 mb-3">
                Problem Statement
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Analysis of Used Bikes Prices for greater profit and Efficiency
                in Business
              </p>
            </motion.div>

            <motion.div
              className="bg-white p-6 rounded-lg shadow-md"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <h3 className="text-xl font-semibold text-blue-800 mb-3">
                Dataset Overview
              </h3>
              <ul className="space-y-3">
                {[
                  "bike_name: The name and model of the bike",
                  "price: The price of the bike (in INR).",
                  "city: The city where the bike is located.",
                  "kms_driven: The total kilometers the bike has been driven.",
                  "owner: The number of previous owners (e.g., First Owner).",
                  "age: The age of the bike (in years).",
                  "power: The engine power (in cc).",
                  "brand: The brand of bike (e.g., Royal Enfield).",
                ].map((goal, index) => (
                  <motion.li
                    key={index}
                    className="flex items-center text-gray-700"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2 }}
                  >
                    <div className="h-2 w-2 rounded-full bg-blue-500 mr-3" />
                    {goal}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  // ... Rest of the components (Page2, Page3) remain the same as in the TypeScript version
  // Just remove the TypeScript type annotations
  // const Page2 = () => (
  //   <motion.div
  //     initial={{ opacity: 0, y: 20 }}
  //     animate={{ opacity: 1, y: 0 }}
  //     transition={{ duration: 0.5 }}
  //   >
  //     <Card className="m-6 bg-gradient-to-br from-white to-purple-50 shadow-xl">
  //       <CardHeader>
  //         <motion.div
  //           initial={{ x: -20 }}
  //           animate={{ x: 0 }}
  //           transition={{ duration: 0.5 }}
  //         >
  //           <CardTitle className="text-3xl text-purple-900">
  //             Model Information
  //           </CardTitle>
  //           <CardDescription className="text-lg">
  //             Output Variables and Model Details
  //           </CardDescription>
  //         </motion.div>
  //       </CardHeader>
  //       <CardContent>
  //         <div className="space-y-6">
  //           <motion.div
  //             className="bg-white p-6 rounded-lg shadow-md"
  //             whileHover={{ scale: 1.02 }}
  //             transition={{ duration: 0.2 }}
  //           >
  //             <h3 className="text-xl font-semibold text-purple-800 mb-3">
  //               Output Variables
  //             </h3>
  //             <p className="text-gray-700 leading-relaxed">
  //               The main output variable is [variable name], which represents
  //               [description].
  //             </p>
  //           </motion.div>

  //           <motion.div
  //             className="bg-white p-6 rounded-lg shadow-md"
  //             whileHover={{ scale: 1.02 }}
  //             transition={{ duration: 0.2 }}
  //           >
  //             <h3 className="text-xl font-semibold text-purple-800 mb-3">
  //               Model Architecture
  //             </h3>
  //             {["Model Type", "Key Features", "Performance Metrics"].map(
  //               (item, index) => (
  //                 <motion.div
  //                   key={index}
  //                   className="mb-4 p-4 bg-purple-50 rounded-lg"
  //                   initial={{ opacity: 0, x: -20 }}
  //                   animate={{ opacity: 1, x: 0 }}
  //                   transition={{ delay: index * 0.2 }}
  //                 >
  //                   <h4 className="font-semibold text-purple-700">{item}</h4>
  //                   <p className="text-gray-600">[Description]</p>
  //                 </motion.div>
  //               )
  //             )}
  //           </motion.div>
  //         </div>
  //       </CardContent>
  //     </Card>
  //   </motion.div>
  // );

  // const Page2 = () => {
  //   const handleRedirect = (url) => {
  //     window.open(url, "_blank");
  //   };

  //   return (
  //     <motion.div
  //       initial={{ opacity: 0, y: 20 }}
  //       animate={{ opacity: 1, y: 0 }}
  //       transition={{ duration: 0.5 }}
  //     >
  //       <Card className="m-6 bg-gradient-to-br from-white to-purple-50 shadow-xl">
  //         <CardHeader>
  //           <motion.div
  //             initial={{ x: -20 }}
  //             animate={{ x: 0 }}
  //             transition={{ duration: 0.5 }}
  //           >
  //             <CardTitle className="text-3xl text-purple-900">
  //               Model Information
  //             </CardTitle>
  //             <CardDescription className="text-lg">
  //               Output Variables and Model Details
  //             </CardDescription>
  //           </motion.div>
  //         </CardHeader>
  //         <CardContent>
  //           <div className="space-y-6">
  //             <motion.div
  //               className="bg-white p-6 rounded-lg shadow-md"
  //               whileHover={{ scale: 1.02 }}
  //               transition={{ duration: 0.2 }}
  //             >
  //               <h3 className="text-xl font-semibold text-purple-800 mb-3">
  //                 Output Variables
  //               </h3>
  //               <p className="text-gray-700 leading-relaxed">
  //                 The main output variable is price, which determines the cost
  //                 of bike.
  //               </p>
  //             </motion.div>

  //             <motion.div
  //               className="bg-white p-6 rounded-lg shadow-md"
  //               whileHover={{ scale: 1.02 }}
  //               transition={{ duration: 0.2 }}
  //             >
  //               <h3 className="text-xl font-semibold text-purple-800 mb-3">
  //                 Model Architecture
  //               </h3>
  //               {["Model Type", "Key Features", "Performance Metrics"].map(
  //                 (item, index) => (
  //                   <motion.div
  //                     key={index}
  //                     className="mb-4 p-4 bg-purple-50 rounded-lg"
  //                     initial={{ opacity: 0, x: -20 }}
  //                     animate={{ opacity: 1, x: 0 }}
  //                     transition={{ delay: index * 0.2 }}
  //                   >
  //                     <h4 className="font-semibold text-purple-700">{item}</h4>
  //                     <p className="text-gray-600">[Description]</p>
  //                   </motion.div>
  //                 )
  //               )}
  //             </motion.div>

  //             <motion.div
  //               className="flex justify-center mt-8"
  //               initial={{ opacity: 0, y: 20 }}
  //               animate={{ opacity: 1, y: 0 }}
  //               transition={{ delay: 0.5 }}
  //             >
  //               <motion.button
  //                 onClick={() =>
  //                   handleRedirect("https://bimodelprediction.onrender.com")
  //                 }
  //                 className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-500 text-white font-semibold rounded-xl shadow-lg
  //                           hover:shadow-2xl transition-all duration-300 overflow-hidden"
  //                 whileHover={{ scale: 1.05 }}
  //                 whileTap={{ scale: 0.95 }}
  //               >
  //                 <div className="flex items-center space-x-2">
  //                   <span>Visit Model</span>
  //                   <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
  //                 </div>
  //                 <motion.div
  //                   className="absolute inset-0 bg-white opacity-20"
  //                   initial={{ x: "-100%" }}
  //                   whileHover={{ x: "100%" }}
  //                   transition={{ duration: 0.5 }}
  //                 />
  //               </motion.button>
  //             </motion.div>
  //           </div>
  //         </CardContent>
  //       </Card>
  //     </motion.div>
  //   );
  // };

  const Page2 = () => {
    const handleRedirect = (url) => {
      window.open(url, "_blank");
    };

    const modelDetails = {
      "Model Type": {
        title: "Random Forest Regressor",
        description:
          "A sophisticated ensemble learning method that operates by constructing multiple decision trees during training. This model was chosen for its ability to handle non-linear relationships and provide robust predictions for bike prices based on multiple features.",
      },
      "Key Features": {
        title: "Input Variables",
        description:
          "The model utilizes several crucial features for prediction:\n\n" +
          "• Bike Name & Brand: Identifies specific models and manufacturers\n" +
          "• City: Location-based price variations\n" +
          "• Kilometers Driven: Measures usage and wear\n" +
          "• Owner History: Number of previous owners\n" +
          "• Age: Vehicle age in years\n" +
          "• Engine Power: Power rating in CC",
      },
      "Performance Metrics": {
        title: "Model Evaluation",
        description:
          "The model demonstrates strong predictive performance:\n\n" +
          "• Kappa Statistic : \nThe Kappa statistic is a number used to measure how much two people (or systems) agree when they are classifying something, while also considering the possibility that they might agree just by chance.\n" +
          "• Mean Absolute Error: \nMeasures the average magnitude of the errors in predictions, calculated as the average of the absolute differences between predicted and actual prices.\n" +
          "• Root Mean Square Error: \nMeasures the square root of the average of the squared differences between predicted and actual prices. It provides a sense of the magnitude of prediction errors.\n" +
          "• Relative Absolute Error (RAE): \nMeasures the absolute error as a percentage of the absolute error of a simple model (e.g., predicting the mean of the target variable). It helps to understand the error relative to a baseline model.\n" +
          "•Root Relative Squared Error (RRSE): \nMeasures the square root of the squared error relative to the squared error of a simple model. It provides a normalized measure of error relative to a baseline model.",
      },
    };

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="m-6 bg-gradient-to-br from-white to-purple-50 shadow-xl">
          <CardHeader>
            <motion.div
              initial={{ x: -20 }}
              animate={{ x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <CardTitle className="text-3xl text-purple-900">
                Model Information
              </CardTitle>
              <CardDescription className="text-lg">
                Output Variables and Model Details
              </CardDescription>
            </motion.div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <motion.div
                className="bg-white p-6 rounded-lg shadow-md"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <h3 className="text-xl font-semibold text-purple-800 mb-3">
                  Output Variables
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  The main output variable is price, which predicts the market
                  value of used bikes in Indian Rupees (INR). The model
                  estimates prices based on historical data and current market
                  trends, providing a reliable reference point for both buyers
                  and sellers.
                </p>
              </motion.div>

              <motion.div
                className="bg-white p-6 rounded-lg shadow-md"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <h3 className="text-xl font-semibold text-purple-800 mb-3">
                  Model Architecture
                </h3>
                {Object.entries(modelDetails).map(([key, value], index) => (
                  <motion.div
                    key={index}
                    className="mb-6 p-4 bg-purple-50 rounded-lg"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2 }}
                  >
                    <h4 className="font-semibold text-purple-700 mb-2">
                      {key}
                    </h4>
                    <div className="space-y-2">
                      <h5 className="text-purple-600 font-medium">
                        {value.title}
                      </h5>
                      <p className="text-gray-600 whitespace-pre-line">
                        {value.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                className="flex justify-center mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <motion.button
                  onClick={() =>
                    handleRedirect("https://bimodelprediction.onrender.com")
                  }
                  className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-500 text-white font-semibold rounded-xl shadow-lg 
                            hover:shadow-2xl transition-all duration-300 overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="flex items-center space-x-2">
                    <span>Visit Model</span>
                    <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </div>
                  <motion.div
                    className="absolute inset-0 bg-white opacity-20"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.5 }}
                  />
                </motion.button>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  };

  const Page3 = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="m-6"
    >
      <Card className="bg-gradient-to-br from-white to-blue-50 shadow-xl">
        <CardHeader>
          <motion.div
            initial={{ x: -20 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <CardTitle className="text-3xl text-blue-900">
              Interactive Dashboard
            </CardTitle>
            <CardDescription className="text-lg">
              Select parameters to update the visualization
            </CardDescription>
          </motion.div>
        </CardHeader>
        <CardContent>
          <motion.div
            className="mb-6"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <Select value={selectedParam} onValueChange={setSelectedParam}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select parameter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="option1">Option 1</SelectItem>
                <SelectItem value="option2">Option 2</SelectItem>
                <SelectItem value="option3">Option 3</SelectItem>
              </SelectContent>
            </Select>
          </motion.div>

          <motion.div
            className="bg-white p-6 rounded-lg shadow-lg overflow-x-auto"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
          >
            <BarChart width={600} height={300} data={sampleData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#4f46e5" />
            </BarChart>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100">
      <Navigation />
      <motion.div
        key={currentPage}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {currentPage === 1 && <Page1 />}
        {currentPage === 2 && <Page2 />}
        {currentPage === 3 && <BikeSalesDashboard />}
      </motion.div>
    </div>
  );
};

export default App;
