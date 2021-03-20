import {Runner} from "./Runner.ts";
import {DenoPermissionType} from "./mod.ts";

export class DenoRunner extends Runner {
  private _verbose: boolean = true;
  private _unstable: boolean = true;
  private permissions: Record<string, boolean | string> = {};

  // constructor() {
  //   super();
  // }

  public allow(permissions: DenoPermissionType[]): DenoRunner {
    permissions.map((permission) => {
      this.permissions["--allow-" + permission] = true;
    });

    return this;
  }

  public allowAll(allow: boolean | string = true): DenoRunner {
    this.permissions["--allow-all"] = allow;

    return this;
  }

  public allowEnv(allow: boolean | string = true): DenoRunner {
    this.permissions["--allow-env"] = allow;

    return this;
  }

  public allowHrtime(allow: boolean | string = true): DenoRunner {
    this.permissions["--allow-hrtime"] = allow;

    return this;
  }

  public allowNet(allow: boolean | string = true): DenoRunner {
    this.permissions["--allow-net"] = allow;

    return this;
  }

  public allowPlugin(allow: boolean | string = true): DenoRunner {
    this.permissions["--allow-plugin"] = allow;

    return this;
  }

  public allowRead(allow: boolean | string = true): DenoRunner {
    this.permissions["--allow-read"] = allow;

    return this;
  }

  public allowRun(allow: boolean | string = true): DenoRunner {
    this.permissions["--allow-run"] = allow;

    return this;
  }

  public allowWrite(allow: boolean | string = true): DenoRunner {
    this.permissions["--allow-write"] = allow;

    return this;
  }

  public verbose(verbose: boolean = true): DenoRunner {
    this._verbose = verbose;

    return this;
  }

  public unstable(unstable: boolean = true): DenoRunner {
    this._unstable = unstable;

    return this;
  }

  public async run(...args: string[]): Promise<void> {
    const flags: string[] = [];
    Object.keys(this.permissions).map((permission) => {
      if (this.permissions[permission]) {
        flags.push(permission);

        return permission;
      }

      if ((typeof this.permissions[permission]) === "string") {
        flags.push(permission + "=" + this.permissions[permission]);
      }
    });

    const parseFlags = flags.join(" ");

    // Todo
    // super.run("deno", "run")

    return;
  }

  public async watch(...args: string[]): Promise<void> {
    // Todo

    return;
  }
}
