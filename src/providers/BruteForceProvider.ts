const { spawn } = require('child_process');

export default class BruteForceProvider {
  private omega: string  = 'abcdef0123456789';
  private target: string ='./source/WebTarget.zip';
  public passwordTable: string[] = [];
  private hashCount: number = 32;

  /** Main Function **/

  public init() {
    const firstLetterOfOmega = this.omega[0];

    for(let i=0;i<this.hashCount;i++) {
      this.passwordTable.push(fistLetterOfOmega);
    }
  }

  public getCurrentPassword(): string {
    console.log(this.passwordTable);
    const newPass = this.passwordTable;

    return newPass.join().replace(/[.\,$+]/g, '');
  }

  public bruteForce(password: string): void {
    const tryPasswordBruteForce = spawn('7z', [`${this.target}`, `-P${password}`]);

    tryPasswordBruteForce.stdout.on('data', (data: any) => {
      console.log(`stdout: ${data}`);
    });

    tryPasswordBruteForce.stderr.on('data', (data: any) => {
      console.error(`stderr: ${data}`);
    });

    tryPasswordBruteForce.on('close', (code: any) => {
      console.log(`child process exited with code ${code}`);
    });
  }

  /** End Main **/

  /*
  private assignANewValueToPasswordArrayIndex(
    previousIndex: number, newIndex: number,
  ): void {
    this.passwordTable[previousIndex] = this.omega[newIndex];
  }*/
}
