// ... (other imports and setup code)

// Set up multer storage for documents
const documentStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      const folderPath = "document-uploads/";
  
      // Create the folder if it doesn't exist
      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
      }
  
      cb(null, folderPath);
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname);
    },
  });
  
  // Set up multer for handling document uploads
  const documentUpload = multer({ storage: documentStorage });
  
  // Define a schema for the documents
  const DocumentSchema = new mongoose.Schema({
    name: String,
    studentNid: String,
    branch: String,
    markSheetSSC: String,
    markSheetHSC: String,
    // Add more fields for other documents
  });
  
  // Create a model for the document schema
  const Document = mongoose.model('Document', DocumentSchema);
  
  // Body parser middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  
  // Add a new endpoint for document uploads

  
  // ... (rest of the existing code)
  
  // Start the server
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
  