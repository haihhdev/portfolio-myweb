// Script để test các API endpoints sau khi deploy
const testEndpoints = async () => {
  const baseUrls = {
    userProject:
      process.env.NEXT_PUBLIC_USER_PROJECT_API_URL || "http://localhost:5000",
    about: process.env.NEXT_PUBLIC_ABOUT_API_URL || "http://localhost:5001",
    resume: process.env.NEXT_PUBLIC_RESUME_API_URL || "http://localhost:5002",
  };

  console.log("🔍 Testing API Endpoints...\n");

  // Test User Project Service
  console.log("📋 Testing User Project Service:");
  try {
    const userResponse = await fetch(`${baseUrls.userProject}/api/users`);
    console.log(
      `✅ Users endpoint: ${userResponse.status} ${userResponse.statusText}`
    );

    const projectResponse = await fetch(`${baseUrls.userProject}/api/projects`);
    console.log(
      `✅ Projects endpoint: ${projectResponse.status} ${projectResponse.statusText}`
    );
  } catch (error) {
    console.log(`❌ User Project Service error: ${error.message}`);
  }

  // Test About Service
  console.log("\n👤 Testing About Service:");
  try {
    const aboutResponse = await fetch(`${baseUrls.about}/api/about`);
    console.log(
      `✅ About endpoint: ${aboutResponse.status} ${aboutResponse.statusText}`
    );
  } catch (error) {
    console.log(`❌ About Service error: ${error.message}`);
  }

  // Test Resume Service
  console.log("\n📄 Testing Resume Service:");
  try {
    const resumeResponse = await fetch(`${baseUrls.resume}/api/resume`);
    console.log(
      `✅ Resume endpoint: ${resumeResponse.status} ${resumeResponse.statusText}`
    );
  } catch (error) {
    console.log(`❌ Resume Service error: ${error.message}`);
  }

  console.log("\n🎉 API testing completed!");
};

// Run test if this file is executed directly
if (typeof window === "undefined") {
  testEndpoints();
}

export default testEndpoints;
