import content from '../app/data.json'
import { ReadonlyURLSearchParams, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import style from 'app/style.module.css';
import 'app/globals.css';

type Epreuve = "dissertation" | "explication";
type PointMethodo = {
   title : string,
   epreuve : Epreuve | any
}

function Menu_Point(methodologie_list : Array<PointMethodo>, epreuve : Epreuve){
    let points = methodologie_list.map((point_title)=>{
        if (point_title.epreuve == epreuve) {
            const path = "/methodologie?title=" + point_title.title.toLowerCase()
            return (
                    // eslint-disable-next-line react/jsx-key
                    <Link href={path} key={point_title.title}>{point_title.title}<br /></Link>
                )
        }
    });
 
    return (
        <div>
            {points}
            <Link href={"/"}>Retour au menu</Link>
        </div>
    )
}

function DefaultNav(){
    const path = "/methodologie?epreuve="
    return (
        <div>
            <Link href={path+"dissertation"}>dissertation</Link><br />
            <Link href={path+"explication"}>explication</Link><br />
            <Link href={"/"}>Retour au menu</Link>
            <Link href="/citation">Citations</Link>
        </div>
    )
}

function NavBar(methodologie_list : Array<PointMethodo>, query_param : ReadonlyURLSearchParams | null ){
    let epreuve : Epreuve | null | any = query_param != null ? query_param.get('epreuve') : null;
    return (
        <nav>
            {epreuve == null ? DefaultNav() : Menu_Point(methodologie_list, epreuve)}
        </nav>
    )
}

export default function Methodologie(){
    let methodologie_list : PointMethodo[] = listPoints();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const query_param = useSearchParams();
    let has_selected = query_param != null && query_param.get('title') != null;
    let wrapper = has_selected ? Conditionnal_renderer(query_param) : NavBar(methodologie_list, query_param) ;

    return(

        <div>
            {wrapper}
        </div>
    )
}

function listPoints(){
    let methodologie_list : PointMethodo[] = []
    for (let i = 0; i < content.methodo.length; i++) methodologie_list.push({title : content.methodo[i].h1, epreuve : content.methodo[i].epreuve});
    return methodologie_list;
}

function Conditionnal_renderer(query_param : ReadonlyURLSearchParams | null) {
    const path = "/methodologie";
    let pm = 0;
    let wrapper = [<nav key={'nav'}><Link href={path}>Retour</Link></nav>];
    if (query_param != null && query_param.get('title')) {
        for (let i = 0; i < content.methodo.length; i++) {
            if (content.methodo[i].h1.toLowerCase() == query_param.get('title')) {
                for (const property in content.methodo[i]) {
                    switch (property) {
                        case 'h1':
                            wrapper.push(<h1 key={'h1'}>{content.methodo[i][property]}</h1>);
                            break;
                        /*case 'h2':
                            wrapper.push(<h2 key={'h2'}>{content.methodo[i][property]}</h2>)
                            break;*/
                        case 'h3':
                            wrapper.push(<h3 key={'h3'}>{content.methodo[i][property]}</h3>)
                            break;
                        case 'p':
                            let j = 0;
                            if (content.methodo[i][property] instanceof Array) {
                                //@ts-ignore
                                wrapper.push(<div key={'div'}>{content.methodo[i][property].map((element : string) => {
                                    j++;
                                    return (j > pm ? <p key={element}>{element}</p> : <p className={style.noDisplay}></p>);
                                })}</div>);
                            }
                            else wrapper.push(<p key={'p'}>{content.methodo[i][property]}</p>);
                            break;
                        case 'ol':
                            wrapper.push(<ol key={'ol'}>{content.methodo[i][property].map((element) => {
                                return (<li key={element}>{element}</li>);
                            })}</ol>);
                            break;
                        case 'pm0':
                            
                            wrapper.push(<div key={`pm${pm}`}><p>{content.methodo[i].p[pm]}</p></div>);
                            pm++;
                            break;
                        case 'epreuve':
                            break;
                        default:
                            wrapper.push(<div key={`unsupported at ${i}`}><p>Unsupported tag at {i} for {property}</p></div>);
                            break;
                    }
                }
            }
        }
    }
    return wrapper;
}
