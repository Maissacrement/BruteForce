const { spawn } = require('child_process');

export default class BruteForceService {
  private omega: string;
  private target: string ;
  private hashCount: number;
  public passwordTable: string[] = [];

   /**
    * @params:
    *   - ensembleOfLetter: string
    *       description: Interval of letter you want use
    *   - pathFileToBruteForce: string
    *       description: path where is defined the target bruteforce file
    *   - hashLength: number
    *       description: password length
    */
  constructor(
    private readonly ensembleOfLetter = 'abcdef0123456789',
    private readonly pathFileToBruteForce = './source/WebTarget.zip',
    private readonly hashLength = 32,
  ) {
    this.omega = ensembleOfLetter;
    this.target = pathFileToBruteForce;
    this.hashCount = hashLength;
  }

  /** Main Function **/

  public init() {
    const firstLetterInOmega = this.omega[0];

    for(let i=0;i<this.hashCount;i++) {
      this.passwordTable.push(firstLetterInOmega);
    }
  }

  public bruteForce() {
    const passwordLength = this.passwordTable.length - 1;
    const omegaLength = this.omega.length - 1;
    let arrayPosition = 0, i = 0;

    this._chageValueOfPasswordTableIndex(0, passwordLength, omegaLength, i);

    while(i < 19) {
      console.log('i,', i, 'omegaLength: ', (i % (omegaLength + 1)))
      if( (i % (omegaLength + 1)) == 0 && i !=0 ) {
        console.log('hello');
        const newIndex = (passwordLength - arrayPosition) % passwordLength
        this.passwordTable[30] = this.omega[1];
        console.log(this.passwordTable);
        arrayPosition += 1;
      }
      this._chageValueOfPasswordTableIndex(
        arrayPosition, passwordLength, omegaLength, i
      );
      const password = this._getCurrentPassword();
      console.log('test', password);
      this._7zTryFindPassword( password );
      i++;
    }
  }

  /** End Main **/

  private _getCurrentPassword(): string {
    const newPass = this.passwordTable;

    return newPass.join().replace(/[.\,$+]/g, '');
  }


  private _7zTryFindPassword(password: string): void {
    const tryPasswordBruteForce = spawn('7z', [`${this.target}`, `-P${password}`]);

    tryPasswordBruteForce.stdout.on('data', (data: any) => {
      // console.log(`stdout: ${data}`);
      console.log(`success`);
    });

    tryPasswordBruteForce.stderr.on('data', (data: any) => {
      console.error(`error`);
    });

    tryPasswordBruteForce.on('close', (code: any) => {
      // console.log(`child process exited with code ${code}`);
    });
  }

  private _chageValueOfPasswordTableIndex(
    previousIndex: number, passLength: number,
    omegaLength: number, newIndex: number,
  ): void {
    this.passwordTable[(passLength - previousIndex) % ( passLength + 1 )] = this.omega[newIndex % ( omegaLength + 1 )];
  }
}
