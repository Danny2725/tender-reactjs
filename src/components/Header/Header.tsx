import * as React from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // Import useLocation từ react-router-dom
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import Cookies from 'js-cookie';


const pages = ['Create Tender', 'Contractors', 'Suppliers'];
const routes = ['/', '/contractors', '/suppliers']; // Định nghĩa các route tương ứng

function ResponsiveAppBar() {
    const navigate = useNavigate(); // Khởi tạo navigate để điều hướng
    const location = useLocation(); // Khởi tạo useLocation để lấy đường dẫn hiện tại


    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogout = () => {
        Cookies.remove('token'); // Xóa token khỏi cookie
        handleCloseUserMenu(); // Đóng menu user
        navigate('/login'); // Điều hướng sang trang login
    };

    const handlePageClick = (index: number) => {
        navigate(routes[index]); // Điều hướng tới route tương ứng
        handleCloseNavMenu(); // Đóng menu khi đã chọn trang
    };

    const isActive = (route: string) => location.pathname === route; // Kiểm tra xem route hiện tại có phải là route đang chọn không
    const token = Cookies.get('token');

    React.useEffect(() => {
        if (!token) {
            navigate('/login');
        }
    }, [token, navigate]);
    return (
        <AppBar position="static" sx={{ backgroundColor: '#fff', boxShadow: 'none' }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters sx={{ gap: '10px' }}>
                    <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, color: '#000' }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        onClick={() => navigate('/')}
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'Roboto, sans-serif',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: '#000',
                            textDecoration: 'none',
                            '&:hover': { color: '#007bff' },
                        }}
                    >
                        LOGO
                    </Typography>

                    {/* Mobile Menu */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon sx={{ color: '#000' }} />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{ display: { xs: 'block', md: 'none' } }}
                        >
                            {pages.map((page, index) => (
                                <MenuItem
                                    key={page}
                                    onClick={() => handlePageClick(index)}
                                    sx={{
                                        color: isActive(routes[index]) ? 'primary.main' : '#000', // Đổi màu cho trang active
                                        '&:hover': {
                                            backgroundColor: 'transparent', // Loại bỏ màu nền khi hover
                                            color: '#007bff', // Vẫn giữ màu chữ khi hover
                                        },
                                    }}
                                >
                                    <Typography sx={{ textAlign: 'center' }}>{page}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    {/* Desktop Menu */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page, index) => (
                            <MenuItem
                                key={page}
                                onClick={() => handlePageClick(index)}
                                sx={{
                                    color: isActive(routes[index]) ? 'primary.main' : '#000', // Đổi màu cho trang active
                                    '&:hover': {
                                        backgroundColor: 'transparent', // Loại bỏ màu nền khi hover
                                        color: '#007bff', // Vẫn giữ màu chữ khi hover
                                    },
                                }}
                            >
                                <Typography sx={{ textAlign: 'center' }}>{page}</Typography>
                            </MenuItem>
                        ))}
                    </Box>

                    {/* User Menu */}
                    <Box sx={{ flexGrow: 0 }}>
                        {token ? (
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt="User Avatar" src="/static/images/avatar/2.jpg" />
                                </IconButton>
                            </Tooltip>
                        ) : null}
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            <MenuItem onClick={handleLogout}>
                                <Typography sx={{ textAlign: 'center', color: '#000' }}>LogOut</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default ResponsiveAppBar;
