import React from "react";
import Hero from "../../components/website/hero/Hero";
import image from "../../assets/hero.jpg";
import image1 from "../../assets/Mission.jpg"
import image2 from "../../assets/Collection.jpeg"
import image3 from "../../assets/Sri.jpg"
const AboutUs = () => {
  return (
    <div className="bg text__color">
      <Hero
        title="Introduction"
        text={
          "Welcome to the ECE Department's centralized resource hub! Here, you'll find all the essential materials for each subject in one convenient place—from lecture notes and reference books to past exam papers and project resources. Our platform simplifies access to everything you need for academic success, fostering self-learning, collaboration, and growth. Say goodbye to scattered searches; everything is right at your fingertips. Make the most of this resource hub as you embark on your academic journey!"
        }
        image={image}
        reverse={true}
      />

      <Hero
        title="Mission"
        text={
          "Our mission is to empower ECE students with a comprehensive, easily accessible resource center that supports academic excellence and fosters self-learning, collaboration, and growth. By centralizing essential study materials—including lecture notes, reference books, exam papers, and project resources—we aim to simplify the learning process, enabling students to focus on achieving their full potential. This platform is dedicated to providing up-to-date resources that meet the evolving needs of our students, creating a foundation for a successful and enriching academic journey."
        }
        image={image1}
      />

      <Hero
        title="Collection"
        text={
          "Our collection provides a comprehensive set of study materials for every ECE-related subject. From lecture notes and reference books to past exam papers and project resources, we ensure that all essential materials are readily available in one place. Whether you're preparing for exams or working on projects, our platform offers everything you need to succeed in your academic journey. With our collection, you no longer need to search through multiple sources—everything is organized and accessible at your fingertips."
        }
        image={image2}
        reverse={true}
      />

      <Hero
        title="Developed By "
        text={
          <p>
            This platform has been developed by two passionate students from the batch of 2021-2025, 
            <br /><strong>Sriram</strong> and <strong>Sairam</strong>. With a deep sense of dedication and a strong 
            desire to contribute to the growth of the ECE department, they have worked tirelessly to create a 
            centralized resource hub that will serve as a valuable tool for all students. Their goal was to offer 
            a platform that not only consolidates study materials but also fosters a culture of self-learning and 
            collaboration within the department.<br /> Through this initiative, <strong>Sriram</strong> and <strong>Sairam </strong> 
             aim to give back to the department that has shaped their academic journey, providing future students 
            with the resources they need to succeed and excel in their studies.
          </p>
          }
        image={image3}
      />
    </div>
  );
};

export default AboutUs;
