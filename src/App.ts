import BruteForceService from './providers/BruteForceService';

const main = () => {
  const bruteForceService = new BruteForceService();

  bruteForceService.init();
  bruteForceService.bruteForce(/*
    ensembleOfLetter='abcdef0123456789',
    pathFileToBruteForce='./source/WebTarget.zip',
    hashLength=32,
  */);
};

main();
