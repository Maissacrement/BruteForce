import BruteForceProvider from './providers/BruteForceProvider';

const main = () => {
  const bruteForceProvider = new BruteForceProvider();
  bruteForceProvider.init();

  const password = bruteForceProvider.getCurrentPassword();
  console.log('Voici mon pass', password);
  bruteForceProvider.bruteForce(password)
};

main();
