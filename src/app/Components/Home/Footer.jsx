const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 py-6 px-4 mt-10">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left">
                <p className="mb-4 md:mb-0">&copy; {new Date().getFullYear()} NextGenStore. All rights reserved.</p>
                <div className="flex space-x-4 text-sm">
                    <a href="#" className="hover:text-white transition">Privacy Policy</a>
                    <a href="#" className="hover:text-white transition">Terms of Service</a>
                    <a href="#" className="hover:text-white transition">Contact</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
