import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Input, Grid,Button,Radio,useInput,Table,Popover,User , Checkbox, Spacer} from "@nextui-org/react";
import { useState } from 'react';
import { useRouter } from 'next/router'
import logo from '../public/a.png'
import fetch from 'isomorphic-unfetch'
import aas from '../public/aa.png'



export async function getServerSideProps(context) {
    const all = await fetch('http://localhost:3001/all')
    const tags = await fetch('http://localhost:3001/key')
    const modaljs = await all.json()
    const aa_json = await tags.json()
    
return {props:{ all: modaljs, tags: aa_json }}

}

export default function Home({all,tags}) {
    
    console.log(all)
    const col = [
        { label:"Title" , key: "title" },
         { label:"Designation" , key: "designation" },

        { label:"Price" , key: "price" },
         { label:"Region" , key: "region_1" },
        { label:"Province" , key: "province" },
         { label:"Country" , key: "country" },
         { label:"Variety" , key: "variety" },
         { label:"Winery" , key: "winery" },
         { label:"Taster" , key: "taster_name" },
         { label:"Points" , key: "points" },
         { label:"Description" , key: "description" },
    ]

    const col1 = [
        { label:"Designation" , key: "designation" },
        { label:"Region" , key: "region_1" },
        { label:"Country" , key: "country" },
        { label:"Variety" , key: "variety" },
        { label:"Winery" , key: "winery" },
        { label:"Taster" , key: "taster_name" },
        { label:"Points" , key: "points" },
        { label:"Description" , key: "description" },
    ]
    const [tagss,setTags] = useState(tags) 
    const [allData,setAll] = useState(all)
    const [checked, setChecked] = useState('title');
    const [sha2,setsha2] = useState(true)
    let sdda = ''
    const [searchButton,setSearch] = useState(false)
    // const [column,setColumn] = useState(col)
    let filters = ''
    var style = {
        base: {
            position: "fixed",
            top: 0,
            "boxShadow": " rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
            "zIndex": "1"

        },

        drop: {
            display: "flex",
            "flex-direction": "row",
            "font-size": "10px"
        },

        inside_drop: {
            display: "flex",
            "justify-content": "space-between",
            "align-items": "center"
        }
    }

    function searchbys(){
        let temp = allData
        if(filters != ''){
            let urll = 'http://localhost:3001/Search?' + checked + '=' + filters
            fetch(urll)
            .then((res) => res.json())
            .then((data) => {
                if(data.length == 0 ){
                    setsha2(false)
                } else {
                    setsha2(true)
                    setAll(data)
                }
                
            }).catch(()=>{
                
            })
        } 
        else{
            
        }
       
        // filters = ''
    }

    function searchVal(event){
        filters =  event.target.value
        if( filters != '') {
            setSearch(true)
        } else {
            setSearch(false)
        }
    }
    return (
        <div className={styles.container1}>
            <Head>
                <title>Lab6</title>
                <meta name="description" content="WINE " />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main1}>
                <div className={styles.headerrcon}>
                    { <Image src={logo}
                        alt="Picture of the author"
                        width={130}
                        height={50}>
                    </Image> }

                    <div className={styles.sssssd}>
                        <User name="FACEBOOK" src='https://cdn3.iconfinder.com/data/icons/free-social-icons/67/facebook_circle_color-512.png'/>
                        <User name="TWITTER" src='https://static.vecteezy.com/system/resources/previews/002/534/045/original/social-media-twitter-logo-blue-isolated-free-vector.jpg'  />
                        
                        <User name="INSTAGRAMM" src='https://img.freepik.com/free-vector/instagram-icon_1057-2227.jpg?w=2000'/>
                        
                    </div>
                </div>


                <div className={styles.maincontainer}>
                    <div className={styles.contollercon}>

                        <div className={styles.contollerconin}>

                            <div className={styles.findGrid}>
                                <Input labelPlaceholder={'Search ' + checked} clearable   onChange={searchVal} key="search" css={{width:'90%',marginTop:'20px'}}></Input>
                               <Grid>{ searchButton && <Button  size='md' shadow color="secondary" css={{width:"210px",marginTop:"20px"}} auto onClick={searchbys}  >Search</Button>}</Grid>
                            </div>
                            <div className={styles.Selectcontoiner}> 
                                <div className={styles.optioname}>
                                <Radio.Group  defaultValue="title" value={checked} aria-label='visible'
                                                onChange={setChecked} css={{marginLeft:'30px',marginTop:'20px'}}>
                                    
                                    {tagss.map((item,index)=>{
                                            if(item == 'region_1'){item = 'REGION'}
                                            if(item == 'taster_name'){item = 'Taster'}
                                            if(!['region_2','taster_twitter_handle','points','price','key'].includes(item) )
                                        {  return(<Radio value={item} key={index} size='xs' > { item.toUpperCase()}</Radio>)}
                                        
                                    })}
                                    
                                
                            </Radio.Group> 
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className={styles.mainDisplay}>
                        <div className={styles.mainDisplayCon}>
                            {sha2&&
                            <Table
                                aria-label="Example dynamic collection table with color selection"
                                fixed
                                css={{ fontSize: "12px", fontFamily: "Arial, Helvetica, sans-serif" }}
                                color="secondary"
                                containerCss={{
                                    height: "100%",
                                    minWidth: "100%",
                                }}
                            >
                                <Table.Header columns={col}>
                                    {(col) => (
                                        <Table.Column key={col.key} css={{height:'0px'}}></Table.Column>
                                    )}
                                </Table.Header>
                                <Table.Body items={allData}>
                                    {(item) => (
                                        <Table.Row key={item.key}>
                                            {(columnKey) => {

                                                if (columnKey == 'title') {
                                                    return (
                                                        <Table.Cell >
                                                            <Popover isBordered>
                                                                <Popover.Trigger>
                                                                    <User
                                                                        src="https://images.pexels.com/photos/2995333/pexels-photo-2995333.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                                                                        name={item[columnKey]}
                                                                        size="xs"
                                                                    /> 
                                                                </Popover.Trigger>
                                                                
                                                                <Popover.Content css={{ px: '$4', py: '$2' }} >

                                                                <div className={styles.sssss}> <div className={styles.asssssss}>INFORMATION</div>
                                                                    {col1.map((index) =>{
                                                                        return (
                                                                                <div>{index.label} : {item[index.key]}</div>
                                                                        )
                                                                    })}</div>
                                                                   
                                                                </Popover.Content> 
                                                            </Popover>
                                                        </Table.Cell>
                                                    )
                                                } else {
                                                    return (
                                                        <Table.Cell>
                                                            {item[columnKey]}
                                                        </Table.Cell>
                                                    )

                                                }
                                            }}
                                        </Table.Row>
                                    )}
                                </Table.Body>

                                <Table.Pagination
                                    shadow
                                    noMargin
                                    align="center"
                                    rowsPerPage={10}
                                    onPageChange={(page) => console.log({ page })}
                                />
                            </Table>}
                            {!sha2 && <div> --------DATA NOT FOUND----------</div>}

                        </div>
                    </div>
                </div>

            </main>
        </div>
    )
}
