import Banner from "../Banner";
import Navbar from "./components/Navbar";

export default function Header({onSearchResults}) {
    return (
        <header>
            <Navbar />
            <Banner onSearchResults = {onSearchResults} />
        </header>
    );
}
