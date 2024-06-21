import FeaturedComp from "./components/FeaturedComp";
import FeaturedJobToday from "./components/FeaturedJobToday";
import JobByCategory from "./components/JobByCategory";
import HowItWork from "./components/HowItWork";

export default function Home() {
    return (
        <main>
            <JobByCategory />
            <HowItWork />
            <FeaturedComp />
            <FeaturedJobToday />
        </main>
    );
}
