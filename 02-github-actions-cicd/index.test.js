const greet = require('./index');

if (greet("Festus") === "Hello, Festus!") {
  console.log("✅ Test Passed");
  process.exit(0);
} else {
  console.log("❌ Test Failed");
  process.exit(1);
}