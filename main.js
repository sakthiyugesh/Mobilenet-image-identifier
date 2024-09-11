document
  .getElementById("imageInput")
  .addEventListener("change", async function (event) {
    const file = event.target.files[0];
    if (file) {
      const imgElement = document.getElementById("selectedImage");
      const spinner = document.getElementById("spinner");
      const loadingText = document.getElementById("loadingText");
      const resultDiv = document.getElementById("predictionResult");

      imgElement.style.display = "none"; // Hide image initially
      spinner.style.display = "block"; // Show loading spinner
      loadingText.style.display = "block"; // Show loading text
      resultDiv.innerHTML = ""; // Clear previous results

      imgElement.src = URL.createObjectURL(file);

      imgElement.onload = async function () {
        // Load MobileNet model
        const model = await mobilenet.load();

        // Perform prediction
        const predictions = await model.classify(imgElement);

        // Hide spinner and loading text, show image and display predictions
        spinner.style.display = "none";
        loadingText.style.display = "none";
        imgElement.style.display = "block";

        // Display prediction results
        predictions.forEach((prediction) => {
          const resultCard = document.createElement("div");
          resultCard.className = "result-card";
          resultCard.innerHTML = `<p>${prediction.className}: ${Math.round(
            prediction.probability * 100
          )}%</p>`;
          resultDiv.appendChild(resultCard);
        });
      };
    }
  });
