module clicker_game::clicker_nft;

use std::string::{Self, String};
use sui::event;
use sui::object::{Self, UID, ID};
use sui::transfer;
use sui::tx_context::{Self, TxContext};

// ========= STRUCTS =========

public struct ClickerNFT has key, store {
    id: UID,
    clicks: u64,
    tier: u8,
    name: String,
    image_url: String,
    is_goat: bool,
}

public struct GOATRegistry has key {
    id: UID,
    goat_count: u64,
    goats: vector<address>,
}

// ========= EVENTS =========

public struct NFTMinted has copy, drop {
    nft_id: ID,
    owner: address,
}

public struct Clicked has copy, drop {
    nft_id: ID,
    new_clicks: u64,
    new_tier: u8,
}

public struct GOATAchieved has copy, drop {
    nft_id: ID,
    player: address,
    total_clicks: u64,
}

// ========= FUNCTIONS =========

fun init(ctx: &mut TxContext) {
    let goat_registry = GOATRegistry {
        id: object::new(ctx),
        goat_count: 0,
        goats: vector::empty<address>(),
    };

    // Partager l'objet pour que tous les joueurs puissent y accéder
    transfer::share_object(goat_registry);
}

// ========= PUBLIC ENTRY FUNCTIONS =========

/// Crée un nouveau NFT pour le joueur (qui sera amener a evoluer)
public entry fun mint_nft(ctx: &mut TxContext) {
    let sender = tx_context::sender(ctx);

    let nft = ClickerNFT {
        id: object::new(ctx),
        clicks: 0,
        tier: 0,
        name: string::utf8(b"Noob"),
        image_url: string::utf8(b"https://placeholder.com/noob.png"),
        is_goat: false,
    };

    let nft_id = object::id(&nft);

    // Émettre l'événement
    event::emit(NFTMinted {
        nft_id,
        owner: sender,
    });

    // Transférer le NFT au joueur
    transfer::transfer(nft, sender);
}

/// Fonction principale de click - incrémente et gère l'évolution
public entry fun click(nft: &mut ClickerNFT, registry: &mut GOATRegistry, ctx: &mut TxContext) {
    let sender = tx_context::sender(ctx);

    // Incrémenter les clicks
    nft.clicks = nft.clicks + 1;

    // Mettre à jour le tier si nécessaire
    update_tier(nft);

    // Vérifier si le joueur peut devenir GOAT
    if (nft.tier >= 3 && !nft.is_goat && registry.goat_count < 10) {
        // Promouvoir à GOAT
        nft.tier = 4;
        nft.name = string::utf8(b"GOAT");
        nft.image_url = string::utf8(b"https://placeholder.com/goat.png");
        nft.is_goat = true;

        // Mettre à jour le registry
        registry.goat_count = registry.goat_count + 1;
        vector::push_back(&mut registry.goats, sender);

        // Émettre l'événement GOAT
        event::emit(GOATAchieved {
            nft_id: object::id(nft),
            player: sender,
            total_clicks: nft.clicks,
        });
    };

    // Émettre l'événement de click
    event::emit(Clicked {
        nft_id: object::id(nft),
        new_clicks: nft.clicks,
        new_tier: nft.tier,
    });
}

// ========= INTERNAL FUNCTIONS =========

/// Met à jour le tier du NFT selon les clicks
fun update_tier(nft: &mut ClickerNFT) {
    let new_tier = get_tier_for_clicks(nft.clicks);

    // Ne mettre à jour que si le tier a changé et qu'on n'est pas GOAT
    if (new_tier > nft.tier && !nft.is_goat) {
        nft.tier = new_tier;

        // Mettre à jour le nom et l'image selon le nouveau tier
        if (new_tier == 1) {
            nft.name = string::utf8(b"Tryhard");
            nft.image_url = string::utf8(b"https://placeholder.com/tryhard.png");
        } else if (new_tier == 2) {
            nft.name = string::utf8(b"No-life");
            nft.image_url = string::utf8(b"https://placeholder.com/nolife.png");
        } else if (new_tier == 3) {
            nft.name = string::utf8(b"Legend");
            nft.image_url = string::utf8(b"https://placeholder.com/legend.png");
        };
    };
}

/// Calcule le tier basé sur le nombre de clicks
fun get_tier_for_clicks(clicks: u64): u8 {
    if (clicks >= 1000) {
        3 // Legend
    } else if (clicks >= 200) {
        2 // No-life
    } else if (clicks >= 50) {
        1 // Tryhard
    } else {
        0 // Noob
    }
}

// ========= VIEW FUNCTIONS =========

/// Retourne le nom du tier
public fun get_tier_name(tier: u8): String {
    if (tier == 4) {
        string::utf8(b"GOAT")
    } else if (tier == 3) {
        string::utf8(b"Legend")
    } else if (tier == 2) {
        string::utf8(b"No-life")
    } else if (tier == 1) {
        string::utf8(b"Tryhard")
    } else {
        string::utf8(b"Noob")
    }
}

/// Getters pour accéder aux propriétés du NFT
public fun get_clicks(nft: &ClickerNFT): u64 {
    nft.clicks
}

public fun get_tier(nft: &ClickerNFT): u8 {
    nft.tier
}

public fun get_name(nft: &ClickerNFT): String {
    nft.name
}

public fun get_image_url(nft: &ClickerNFT): String {
    nft.image_url
}

public fun is_goat(nft: &ClickerNFT): bool {
    nft.is_goat
}

/// Getter pour le nombre de GOATs
public fun get_goat_count(registry: &GOATRegistry): u64 {
    registry.goat_count
}
