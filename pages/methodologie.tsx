import content from '../app/data.json'
import { ReadonlyURLSearchParams, useSearchParams } from 'next/navigation';
import Link from 'next/link';

function Menu_Point(methodologie_list : Array<string>){
    return methodologie_list.map((point_title)=>{
        const path = "/methodologie?title=" + point_title.toLowerCase()
        return (
            // eslint-disable-next-line react/jsx-key
            <span><Link href={path} key={point_title}>{point_title}</Link><br /></span>
        )
    });
}

function NavBar(methodologie_list : Array<string>){
    return (
        <nav>
            {Menu_Point(methodologie_list)}
            <Link href={"/index"}>Retour au menu</Link>
        </nav>
    )
}

export default function Methodologie(){
    let methodologie_list : string[] = []
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const query_param = useSearchParams();
    let wrapper = Conditionnal_renderer(methodologie_list, query_param);
    let has_selected = query_param != null && query_param.get('title') != null;
    return(

        <div>
            {!has_selected ? NavBar(methodologie_list) : wrapper}
        </div>
    )
}

function Conditionnal_renderer(methodologie_list: string[], query_param : ReadonlyURLSearchParams | null) {
    const path = "/methodologie";
    let wrapper = [<nav key={'nav'}><Link href={path}>Retour</Link></nav>];
    for (let i = 0; i < content.methodo.length; i++) methodologie_list.push(content.methodo[i].h1);
    if (query_param != null && query_param.get('title')) {
        for (let i = 0; i < content.methodo.length; i++) {
            if (content.methodo[i].h1.toLowerCase() == query_param.get('title')) {
                for (const property in content.methodo[i]) {
                    switch (property) {
                        case 'h1':
                            wrapper.push(<h1 key={'h1'}>{content.methodo[i][property]}</h1>);
                            break;
                        case 'h2':
                            wrapper.push(<h2 key={'h2'}>{content.methodo[i][property]}</h2>)
                            break;
                        case 'h3':
                            wrapper.push(<h3 key={'h3'}>{content.methodo[i][property]}</h3>)
                            break;
                        case 'p':
                            if (content.methodo[i][property] instanceof Array) {
                                wrapper.push(<div key={'div'}>{content.methodo[i][property].map((element) => {
                                    return (<p key={element}>{element}</p>);
                                })}</div>);
                            }
                            else wrapper.push(<p key={'p'}>{content.methodo[i][property]}</p>);
                            break;
                        case 'ol':
                            wrapper.push(<ol key={'ol'}>{content.methodo[i][property].map((element) => {
                                return (<li key={element}>{element}</li>);
                            })}</ol>);
                            break;
                    }
                }
            }
        }
    }
    return wrapper;
}
