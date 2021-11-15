const handleFileChange = (
  event: React.ChangeEvent<HTMLInputElement>,
  setFile: (value: React.SetStateAction<File | null>) => void
) => {
  const file = event.target.files && event.target.files[0];
  const fileExtension = file?.name.split('.').pop();

  if (fileExtension === 'tcx') {
    setFile(file);
  } else {
    console.warn('File Extension Not Supported');
  }
};

export default handleFileChange;
