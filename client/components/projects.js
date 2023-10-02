import SingleProject from "./single-projects/singleProject"
import ndLogo from '../public/images/ndlogomini.png'
import ndThumb from '../public/images/naturedopesthumb.png'
import popupThumb from '../public/images/popweddingThumb.png'

export default function Projects(){

    return(
        <section className='projects'>
            <h2 className="animatedHeader">Projects</h2>

             <SingleProject link="https://www.naturedopes.com/" heading='Nature Dopes' src={ndThumb} alt='Nature Dopes Thumbnail' desc="Nature Dopes 
             is an ongoing project dedicated to creating a site firstly for the appreciation of natural flora, secondly as an educational tool. 
             To preserve the environment, we first need to understand it. It's a full stack application developed in HTML, CSS, NodeJS/ExpressJS & postgreSQL. 
             Follow the link to view" /> 

            <SingleProject link="https://www.thepopupweddingcreche.fr/" heading='The Popup Wedding Creche' src={popupThumb} alt='The pop up wedding creche thumbnail' desc="This is the homepage page for a new startup business offering childcare options for weddings and large events, please give them a look if you have any major events planned in South West France. 
            The site is developed in HTML, CSS & NodeJS/ExpressJS. Follow the link to view " />


        </section>
    )
}