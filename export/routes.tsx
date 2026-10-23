import Home from '../source/app/page';
import About from '../source/app/hakkimizda/page';
import Services from '../source/app/hizmetlerimiz/page';
import Gallery from '../source/app/galeri/page';
import Contact from '../source/app/iletisim/page';
export const routes:Record<string,any>={'/':Home,'/hakkimizda':About,'/hizmetlerimiz':Services,'/galeri':Gallery,'/iletisim':Contact};
