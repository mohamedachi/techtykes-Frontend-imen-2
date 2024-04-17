import SvgColor from 'src/components/svg-color';
import AssistantIcon from '@mui/icons-material/Assistant';
// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'dashboard',
    path: '/',
    icon: icon('ic_analytics'),
  },
  {
    title: 'conversations',
    path: '/conversations',
    icon: icon('ic_blog'),
  },
  {
    title: 'Plans',
    path: '/plans',
    icon: icon('ic_cart'),
  },
  // new
    {
    title: 'Bot',
    path: '/bot',
    icon: <AssistantIcon/>,
  },

 
     {
    title: 'add bot',
    path: '/add_bot',
    icon: <AssistantIcon/>,
  },
    {
    title: 'base of knowledge',
    path: '/baseofknowledge',
    icon: icon('ic_cart'),
  }
];

export default navConfig;
