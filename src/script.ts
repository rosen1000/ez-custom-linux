export class Script {
    scriptName: string;
    dependencies: string[];
    distros: string[];

    install(): void {}
    customize(): void {}
    remove(): void {}
}
