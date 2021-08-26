import { Article } from "./Article";
import { Component, useEffect, useRef, useState } from "react";
import { CreateArticle } from "./CreateArticle";
import { Link, Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { theme } from "../../theme";
import ArticleCard from "./ArticleCard";
import React from "react";
import styled from "styled-components";

const P = styled.p`
  background: #350202;
  color: #6b3737;
`;

type Blog = {
  blog: {
    author: string;
    title: string;
    text: string;
    date: string;
    articleURL: string;
  };
};

type BlogContextValue = {
  blogs: Blog[];
  setBlogs: React.Dispatch<React.SetStateAction<Blog[]>>;
};

export const BlogContext = React.createContext<BlogContextValue>(null as any);

export const BASE_URL = "/blog/";

export const Blog = () => {
  const [blogs, setBlogs] = useState<Blog[]>([
    {
      blog: {
        author: "Andrej",
        title: "test",
        text: `# Lora cum parte nec a primordia redeat\n## Ales clamant\n
        Lorem markdownum cauda inplicat credit, vultus, potentem ora ferarum capiti
        discriminis urbis; ait. *Instat ultima*, exhausta esset! Nubibus nec edidicitque
        Cypro reppulit sorores terruit numina insequitur: serta ait vulnus *potui*,
        lactantes vicit [rates datur](http://vires.com/), tectura. Vota nata nondum
        mundi Ericthonio coniugis inter [doloris\ndiscite](http://nec-quid.org/simillima-conplexa) trepidare plus. Solum *pedum
        ne* opus genuere exhibita gradus inponere, vi, curvamine?\n\nAliquem causam, est nisi hoc [latus oblita](http://mora.net/cognataquede.php)
        ripis discutit iuncique et. Quoque Autonoe aequoreos vivaque, tumidisque,
        integer minitantiaque tenuata moenia aristas *augurio tamen pars* subductaque.
        Mixta extemplo tempora turba postes populum in vicit, **licet metum traiecit**
        minanti, non utiliter facta nec aliquis. Index rates et quo late, **ipsa**.
        Innectite ferus; tellure Prima offer ruunt sepulcrum ad bella: non.\n\n## Aegeus urbes\nVittisconcutiens damnatur exspectant, recepi meritique raptaque orsa: soluti
        **omnes ora** meo. Non nitidaque nostri gaudet tenuere.\n Diebus parte; illa molles iussa bracchia garrula duorum sola, commisi erat malis
        genetrix paterno regina! Ex inarsit carina; luce an furori nisi, columbae nec
        neve sim nitentem. Extremos nefas advena ut nunc recusat, quantum **cum en
        pestifero** quoquam! Helicona ad fata fratris voluntas cunctos illac quotiens.
        Saepe eram minorque circa ad lapides Graias ferre gemino non nec; et ergo regnum
        tumulos Olympi ne sine partu.
        
            var biosBiometrics = default_plug.component_encoding(integratedServerKey(
                    edutainment_aiff_alpha(compression, lossy_tag), rgbJfs / card),
                    rw.illegal_ppc_software.broadbandWrapZettabyte(92));
            var prom = 96;
            restoreWhitelist = 84930;
            folderInput.vpi_laser_backbone = 5;
        
        ## Vocem habetur totis cum factus non
        
        Quas suo, Aonius o lacrimas eodem, recentes pollice mare sagacior suos. Alta
        utrimque interdum voluit, dicentem sequuntur ablatus, currus?
        
            if (-1 + commandEncodingCompatible + arp_avatar > disk_cybersquatter_hard) {
                dotMetal /= rw_power_nui(aspTutorialStatus.rfidPort.inboxFiber(
                        vgaClipboardYobibyte));
                templateSataCard.loadRamClient = 5;
                captcha = 600405;
            }
            var whitelistVideo = hard;
            searchInstall.ataZif(bing.portalDomain(4, iphone_mini + 397902, ios),
                    login_programming, ddrWpa.remoteBar(662358 + floodTruncate));
            multithreading.pda(friendly(cdfsSambaParity, desktop_snippet,
                    wavelength_card.webOnPython(cybercrime_memory_ddr)),
                    hardware_cybersquatter_checksum);
            controller_site_refresh += kibibyte
        
        Flamma optaris edere occupat verba inprovisoque saepe lactis coniunx terrore
        Inoosque numen, dixit; [dum Neptunus](http://ignes-vulnus.com/sunt). Obscurus
        obituque terrarum tenens, est *esse piae* stravit daedalus! *Omnia coeptas*;
        vetitorum sequitur Veneris vix herbis, nec amborum quod litus, autumnos acre.`,
        date: "25.08.2021",
        articleURL: "alksjfka",
      },
    },
    {
      blog: {
        author: "Kleofáš",
        title: "druhy artikel",
        text: "čvachtanie",
        date: "26.08.2021",
        articleURL: "cvachtanie",
      },
    },
  ]);

  return (
    <BlogContext.Provider value={{ blogs, setBlogs }}>
      <NavWrapper>
        <div>
          <Link to={`${BASE_URL}AllPosts`}>All posts</Link>
        </div>
        <div>
          <Link to={`${BASE_URL}NewPost`}>New Post</Link>
        </div>
      </NavWrapper>
      {blogs.map((blog, index) => (
        <Route key={index} path={`${BASE_URL}${blog.blog.articleURL}`}>
          <Article blog={blog.blog} fulltext={true} />
        </Route>
      ))}
      <Route path={`${BASE_URL}NewPost`}>
        <CreateArticle></CreateArticle>
      </Route>
      <Route path={`${BASE_URL}AllPosts`}>
        <div>
          {blogs.map((blog, index) => (
            <Article key={index} blog={blog.blog} fulltext={false} />
          ))}
        </div>
      </Route>
    </BlogContext.Provider>
  );
};

const NavWrapper = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;
