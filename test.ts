interface I {
    par1: number;
    par2: number;
}

interface I2 {
    par3: number;
}

type One = 1;
type Zero = 0;


type Add<T, U> = T extends Zero ? U :
    (U extends Zero ? T : Add<T, U>);


type M = Add<One, Zero>;

type static_assert<T> = T extends true ? true : never;


// function f<T extends I>(arg: I | I2) {
//     console.log(arg);
// }





