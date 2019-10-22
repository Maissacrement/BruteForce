import BruteForceProvider from './providers/BruteForceProvider';

const main = () => {
  const bruteForceProvider = new BruteForceProvider();

  bruteForceProvider.init();
  bruteForceProvider.bruteForce();
};

main();
