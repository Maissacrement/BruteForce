const { spawn } = require('child_process');

export default class BruteForceProvider {
  private omega: string  = 'abcdef0123456789';
  private target: string ='./source/WebTarget.zip';
  public passwordTable: string[] = [];
  private hashCount: number = 32;

  /** Main Function **/

  public init() {
    const firstLetterInOmega = this.omega[0];

    for(let i=0;i<this.hashCount;i++) {
      this.passwordTable.push(firstLetterInOmega);
    }
  }

  public getCurrentPassword(): string {
    const newPass = this.passwordTable;

    return newPass.join().replace(/[.\,$+]/g, '');
  }

  public bruteForce() {
    const passwordLength = this.passwordTable.length - 1;
    let i = 0;

    while(i < 10) {
      const password = this.getCurrentPassword();
      this.chageValueOfPasswordTableIndex(0, passwordLength, i)
      this._7zTryFindPassword( password );

      console.log(password);
      i++;
    }
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

  /** End Main **/
  private chageValueOfPasswordTableIndex(
    previousIndex: number, passLength: number, newIndex: number,
  ): void {
    this.passwordTable[(passLength - previousIndex) % ( passLength + 1 )] = this.omega[newIndex];
  }
}
