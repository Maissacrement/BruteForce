import BruteForceService from './providers/BruteForceService';

const main = () => {
  // Remove argument assignation variables 
  const bruteForceService = new BruteForceService(/*
    ensembleOfLetter='abcdef0123456789',
    pathFileToBruteForce='./source/WebTarget.zip',
    hashLength=32,
  */);

  bruteForceService.init();
  bruteForceService.bruteForce();
};

main();
