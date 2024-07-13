import { useEffect } from "react";
import PropTypes from "prop-types";
import HowItWork from "./components/HowItWork";
import FeaturedComp from "./components/FeaturedComp";
import JobByCategory from "./components/JobByCategory";
import FeaturedJobToday from "./components/FeaturedJobToday";

Home.propTypes = {
    title: PropTypes.string,
};

export default function Home(props) {
    const { title } = props;
    useEffect(() => {
        document.title = title ? `${title}` : "Page Does Not Exist";
    }, [title]);

    return (
        <main>
            <JobByCategory />
            <HowItWork />
            <FeaturedComp />
            <FeaturedJobToday />
        </main>
    );
}
