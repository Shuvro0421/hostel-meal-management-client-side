
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css'
import AllMeals from '../Meals/AllMeals';
import Meals from '../Meals/Meals';
const TabsComponent = () => {

    return (
        <div>
            <Tabs className={'text-orange-400  font-semibold md:m-5 m-2 p-2 md:p-5 rounded-lg'}>
                <TabList>
                    <Tab>All Meals</Tab>
                    <Tab>BreakFast</Tab>
                    <Tab>Lunch</Tab>
                    <Tab>Dinner</Tab>
                </TabList>
                <div className='h-96 thin-scrollbar overflow-auto'>
                    <TabPanel>
                        <AllMeals></AllMeals>
                    </TabPanel>
                    <TabPanel>
                        <Meals category={'breakfast'}></Meals>
                    </TabPanel>
                    <TabPanel>
                        <Meals category={'lunch'}></Meals>
                    </TabPanel>
                    <TabPanel>
                        <Meals category={'dinner'}></Meals>
                    </TabPanel>
                </div>
            </Tabs>
        </div>
    );
};

export default TabsComponent;