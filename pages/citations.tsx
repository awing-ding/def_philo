import definition from '../app/data.json';
import '../app/globals.css';
import style from 'app/style.module.css';
import { ReactNode } from 'react';
import Link from 'next/link';
import navbar from 'pages/navbar.tsx';


interface Citation {
    auteur : string,
    citation : string,
    notion : Array<string>,
    ouvrage : string,
    latin? : string
}

async function handleAuthorSelection() {
    let elements = document.querySelectorAll('main > div');
    const author_selector = document.getElementById('author-select') as HTMLSelectElement;
    const author_selector_value = author_selector.value;
    elements.forEach(el => {
        let element = el as HTMLElement;
        let author = element.getAttribute('data-auteur'); 
        if (author_selector_value === 'none' || author_selector_value === 'all' || author === author_selector_value){
            element.style.display = 'inherit';
        }
        else element.style.display = 'none';
    });
}


function selectAuthor(){
    let authors = [];
    for (let i = 0; i < definition.citations.length; i++) {
        let j = definition.citations[i].auteur;
        if (!authors.includes(j)){
            authors.push(definition.citations[i].auteur);
        }
    }
    return (
        <select name="author" id="author-select" onChange={handleAuthorSelection}>
            <option value="none">Choisir un auteur</option>
            <option value="all">Afficher tout</option>
            {authors.map((author) => {
                return (
                    <option value={author} key={author}>{author}</option>
                )
            })}
        </select>
    )
}

function sortCitationByAuthor(a : Citation, b : Citation){
    if (a.auteur < b.auteur) return -1;
    if (a.auteur > b.auteur) return 1;
    return 0;
}

const citation_renderer : ReactNode = definition.citations.sort(sortCitationByAuthor).map((citation) => {
    if ("latin" in citation){
        return (
            <div key={citation.citation} data-notion={citation.notion} data-auteur={citation.auteur}>
                <p className={style.citation}>
                <span className={style.latin}>«{citation.latin}»</span><br />
                <span className={style.citation}>{citation.citation}</span><br /><span className={style.ouvrage}>  {citation.ouvrage}</span> — <span className={style.definition}>{citation.auteur}</span></p>
            </div>
        );
    }
    else {
        return (
            <div key={citation.citation} data-notion={citation.notion} data-auteur={citation.auteur}>
                <p className={style.citation}><span className={style.citation}>{citation.citation}</span><br /><span className={style.ouvrage}>  {citation.ouvrage}</span> — <span className={style.definition}>{citation.auteur}</span></p>
            </div>
        );
    }
});

export default function renderer(){
    return (
        <div>
            {navbar()}
            <h2>Citations:</h2>
            {selectAuthor()}
            {citation_renderer}
        </div> 
    )

}